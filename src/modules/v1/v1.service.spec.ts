import { Card } from '../../entity';
import { Repository } from 'typeorm/repository/Repository';
import { V1Service } from './v1.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { getMockCard, TestDatabase } from '@monacardjs/lib';

describe('V1Services', () => {
  let repository: Repository<Card>;
  let db: TestDatabase;
  let service: V1Service;

  beforeAll(async () => {
    db = new TestDatabase();
    repository = await db.getRepository<Card>(Card);
    service = new V1Service(repository);
  });
  beforeEach(async () => {
    await repository.clear();
  });
  afterAll(async () => {
    await db.tearDown();
  });

  describe('findAllNames', () => {
    it('should find all names', async () => {
      const mockCard1 = getMockCard('1');
      const mockCard2 = getMockCard('2');

      await repository.save([mockCard1, mockCard2]);

      const res = await service.findAllNames();
      expect(res).toHaveLength(2);
      expect(res[0]).toBe(mockCard2.assetLongname);
      expect(res[1]).toBe(mockCard1.assetLongname);
    });

    it('should find all names without long name', async () => {
      const mockCard1 = getMockCard('1');
      const mockCard2 = getMockCard('2');

      await repository.save([
        { ...mockCard1, assetLongname: null },
        { ...mockCard2, assetLongname: null },
      ]);

      const res = await service.findAllNames();
      expect(res).toHaveLength(2);
      expect(res[0]).toBe(mockCard2.asset);
      expect(res[1]).toBe(mockCard1.asset);
    });
  });

  describe('findAll', () => {
    it('should find all with assets', async () => {
      const mockCard1 = getMockCard('1');
      const mockCard2 = getMockCard('2');
      const mockCard3 = getMockCard('3');

      await repository.save([mockCard1, mockCard2, mockCard3]);

      let res = await service.findAll({
        assets: mockCard1.asset || undefined,
      });

      expect(res).toHaveLength(1);
      expect(res[0]).toEqual(mockCard1);

      res = await service.findAll({
        assets: `${mockCard1.asset},${mockCard3.asset}`,
      });
      expect(res).toHaveLength(2);
      expect(res[0]).toEqual(mockCard3);
      expect(res[1]).toEqual(mockCard1);
    });

    it('should find all with assets by asset long name', async () => {
      const mockCard1 = getMockCard('1');
      const mockCard2 = getMockCard('2');
      const mockCard3 = getMockCard('3');

      await repository.save([mockCard1, mockCard2, mockCard3]);

      let res = await service.findAll({
        assets: mockCard1.assetLongname || undefined,
      });

      expect(res).toHaveLength(1);
      expect(res[0]).toEqual(mockCard1);

      res = await service.findAll({
        assets: `${mockCard1.assetLongname},${mockCard3.asset}`,
      });
      expect(res).toHaveLength(2);
      expect(res[0]).toEqual(mockCard3);
      expect(res[1]).toEqual(mockCard1);
    });

    it('should find all with tag', async () => {
      const mockCard1 = { ...getMockCard('1'), tag: 'tag1' };
      const mockCard2 = { ...getMockCard('2'), tag: 'tag1' };
      const mockCard3 = { ...getMockCard('3'), tag: 'tag2' };

      await repository.save([mockCard1, mockCard2, mockCard3]);

      let res = await service.findAll({
        tag: 'tag1',
      });

      expect(res).toHaveLength(2);
      expect(res[0]).toEqual(mockCard2);
      expect(res[1]).toEqual(mockCard1);

      res = await service.findAll({
        tag: 'tag2',
      });
      expect(res).toHaveLength(1);
      expect(res[0]).toEqual(mockCard3);
    });

    it('should find all with update time', async () => {
      const nowSec = Date.now() / 1000;
      const mockCard1 = {
        ...getMockCard('1'),
        updateTime: new Date((nowSec - 3000) * 1000),
      };
      const mockCard2 = {
        ...getMockCard('2'),
        updateTime: new Date((nowSec - 2000) * 1000),
      };
      const mockCard3 = {
        ...getMockCard('3'),
        updateTime: new Date((nowSec - 1000) * 1000),
      };

      await repository.save([mockCard1, mockCard2, mockCard3]);

      let res = await service.findAll({
        update_time: nowSec,
      });
      expect(res).toHaveLength(0);

      res = await service.findAll({
        update_time: nowSec - 1001,
      });
      expect(res).toHaveLength(1);
      expect(res[0]).toEqual(mockCard3);

      res = await service.findAll({
        update_time: nowSec - 2001,
      });
      expect(res).toHaveLength(2);
      expect(res[0]).toEqual(mockCard3);
      expect(res[1]).toEqual(mockCard2);

      res = await service.findAll({
        update_time: nowSec - 3001,
      });
      expect(res).toHaveLength(3);
      expect(res[0]).toEqual(mockCard3);
      expect(res[1]).toEqual(mockCard2);
      expect(res[2]).toEqual(mockCard1);

      res = await service.findAll({
        update_time: nowSec - 1000,
      });
      expect(res).toHaveLength(0);
    });

    it('should fail to find all with no params', async () => {
      const mockCard1 = getMockCard('1');

      await repository.save(mockCard1);

      try {
        await service.findAll({});
      } catch (error) {
        expect(error).toEqual(
          new HttpException('No parameters.', HttpStatus.BAD_REQUEST),
        );
      }
    });

    it('should fail to find all with invalid assets', async () => {
      const mockCard1 = getMockCard('1');

      await repository.save(mockCard1);

      try {
        await service.findAll({ assets: ',,,' });
      } catch (error) {
        expect(error).toEqual(
          new HttpException(
            `Incorrect parameters. asset: `,
            HttpStatus.BAD_REQUEST,
          ),
        );
      }

      try {
        await service.findAll({ assets: '&&&&&' });
      } catch (error) {
        expect(error).toEqual(
          new HttpException(
            `Incorrect parameters. asset: &&&&&`,
            HttpStatus.BAD_REQUEST,
          ),
        );
      }
    });
  });

  describe('findAllBanlist', () => {
    it('should find all ban list', async () => {
      let mockCard1 = { ...getMockCard('1'), status: 'copyright' };
      let mockCard2 = { ...getMockCard('2'), status: 'good' };
      let mockCard3 = { ...getMockCard('3'), status: 'publicity' };

      [mockCard1, mockCard2, mockCard3] = await repository.save([
        mockCard1,
        mockCard2,
        mockCard3,
      ]);

      const res = await service.findAllBanlist();
      expect(res).toHaveLength(2);
      expect(res[0]).toEqual(mockCard3);
      expect(res[1]).toEqual(mockCard1);
    });
  });
});
