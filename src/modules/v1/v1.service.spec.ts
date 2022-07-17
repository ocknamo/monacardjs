import { Card } from '../../entity';
import { Repository } from 'typeorm/repository/Repository';
import { V1Service } from './v1.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { getMockCard, TestDatabase } from 'monacardjs/test';

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
      const mockCard1 = getMockCard('01');
      const mockCard2 = getMockCard('02');

      await repository.save([mockCard1, mockCard2]);

      const res = await service.findAllNames();
      expect(res).toHaveLength(2);
      expect(res[0]).toBe(mockCard2.assetLongname);
      expect(res[1]).toBe(mockCard1.assetLongname);
    });

    it('should find all names without long name', async () => {
      const mockCard1 = getMockCard('01');
      const mockCard2 = getMockCard('02');

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
      const mockCard1 = getMockCard('01');
      const mockCard2 = getMockCard('02');
      const mockCard3 = getMockCard('03');

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
      const mockCard1 = getMockCard('01');
      const mockCard2 = getMockCard('02');
      const mockCard3 = getMockCard('03');

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
      const mockCard1 = { ...getMockCard('01'), tag: 'tag1' };
      const mockCard2 = { ...getMockCard('02'), tag: 'tag1' };
      const mockCard3 = { ...getMockCard('03'), tag: 'tag2' };

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
      const now = Date.now();
      const mockCard1 = {
        ...getMockCard('01'),
        updateTime: new Date(now - 3000),
      };
      const mockCard2 = {
        ...getMockCard('02'),
        updateTime: new Date(now - 2000),
      };
      const mockCard3 = {
        ...getMockCard('03'),
        updateTime: new Date(now - 1000),
      };

      await repository.save([mockCard1, mockCard2, mockCard3]);

      let res = await service.findAll({
        update_time: now,
      });
      expect(res).toHaveLength(0);

      res = await service.findAll({
        update_time: now - 1001,
      });
      expect(res).toHaveLength(1);
      expect(res[0]).toEqual(mockCard3);

      res = await service.findAll({
        update_time: now - 2001,
      });
      expect(res).toHaveLength(2);
      expect(res[0]).toEqual(mockCard3);
      expect(res[1]).toEqual(mockCard2);

      res = await service.findAll({
        update_time: now - 3001,
      });
      expect(res).toHaveLength(3);
      expect(res[0]).toEqual(mockCard3);
      expect(res[1]).toEqual(mockCard2);
      expect(res[2]).toEqual(mockCard1);

      res = await service.findAll({
        update_time: now - 1000,
      });
      expect(res).toHaveLength(0);
    });

    it('should fail to find all with no params', async () => {
      const mockCard1 = getMockCard('01');

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
      const mockCard1 = getMockCard('01');

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
      let mockCard1 = { ...getMockCard('01'), status: 'copyright' };
      let mockCard2 = { ...getMockCard('02'), status: 'good' };
      let mockCard3 = { ...getMockCard('03'), status: 'publicity' };

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