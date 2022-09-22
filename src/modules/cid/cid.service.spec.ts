import { Card } from '../../entity';
import { Repository } from 'typeorm';
import { getMockCard, TestDatabase } from '@monacardjs/lib';
import { CidService } from './cid.service';

describe('CidServices', () => {
  let repository: Repository<Card>;
  let db: TestDatabase;
  let service: CidService;

  beforeAll(async () => {
    db = new TestDatabase();
    repository = await db.getRepository<Card>(Card);
    service = new CidService(repository);
  });
  beforeEach(async () => {
    await repository.clear();
  });
  afterAll(async () => {
    await db.tearDown();
  });

  it('should get all cids', async () => {
    let mockCard1 = getMockCard('1');
    let mockCard2 = getMockCard('2');
    let mockCard3 = getMockCard('3');

    [mockCard1, mockCard2, mockCard3] = await repository.save([
      { ...mockCard1, status: 'good' },
      { ...mockCard2, status: 'good' },
      { ...mockCard3, status: 'good' },
    ]);

    const res = await service.findAllCids({});

    expect(res).toHaveLength(3);
    expect(res[0]).toEqual({
      cid: mockCard3.cid,
      updateTime: mockCard3.updateTime,
    });
    expect(res[1]).toEqual({
      cid: mockCard2.cid,
      updateTime: mockCard2.updateTime,
    });
    expect(res[2]).toEqual({
      cid: mockCard1.cid,
      updateTime: mockCard1.updateTime,
    });
  });

  it('should get all cids without invalid status', async () => {
    let mockCard1 = getMockCard('1');
    let mockCard2 = getMockCard('2');
    let mockCard3 = getMockCard('3');

    [mockCard1, mockCard2, mockCard3] = await repository.save([
      { ...mockCard1, status: 'good' },
      { ...mockCard2, status: 'invalid' },
      { ...mockCard3, status: 'ban' },
    ]);

    const res = await service.findAllCids({});

    expect(res).toHaveLength(1);
    expect(res[0]).toEqual({
      cid: mockCard1.cid,
      updateTime: mockCard1.updateTime,
    });
  });

  it('should get all cids with update time', async () => {
    const now = Date.now();
    const mockCard1 = {
      ...getMockCard('1'),
      status: 'good',
      updateTime: new Date(now - 3000),
    };
    const mockCard2 = {
      ...getMockCard('2'),
      status: 'good',
      updateTime: new Date(now - 2000),
    };
    const mockCard3 = {
      ...getMockCard('3'),
      status: 'good',
      updateTime: new Date(now - 1000),
    };

    await repository.save([mockCard1, mockCard2, mockCard3]);

    let res = await service.findAllCids({
      update_time: now,
    });
    expect(res).toHaveLength(0);

    res = await service.findAllCids({
      update_time: now - 1001,
    });
    expect(res).toHaveLength(1);
    expect(res[0]).toEqual({
      cid: mockCard3.cid,
      updateTime: mockCard3.updateTime,
    });

    res = await service.findAllCids({
      update_time: now - 2001,
    });
    expect(res).toHaveLength(2);
    expect(res[0]).toEqual({
      cid: mockCard3.cid,
      updateTime: mockCard3.updateTime,
    });
    expect(res[1]).toEqual({
      cid: mockCard2.cid,
      updateTime: mockCard2.updateTime,
    });

    res = await service.findAllCids({
      update_time: now - 3001,
    });
    expect(res).toHaveLength(3);
    expect(res[0]).toEqual({
      cid: mockCard3.cid,
      updateTime: mockCard3.updateTime,
    });
    expect(res[1]).toEqual({
      cid: mockCard2.cid,
      updateTime: mockCard2.updateTime,
    });
    expect(res[2]).toEqual({
      cid: mockCard1.cid,
      updateTime: mockCard1.updateTime,
    });

    res = await service.findAllCids({
      update_time: now - 1000,
    });
    expect(res).toHaveLength(0);
  });

  it('should get all cids without empty cid', async () => {
    let mockCard1 = getMockCard('1');
    let mockCard2 = getMockCard('2');
    let mockCard3 = getMockCard('3');

    [mockCard1, mockCard2, mockCard3] = await repository.save([
      { ...mockCard1, status: 'good' },
      { ...mockCard2, status: 'good', cid: '' },
      { ...mockCard3, status: 'good' },
    ]);

    const res = await service.findAllCids({});

    expect(res).toHaveLength(2);
    expect(res[0]).toEqual({
      cid: mockCard3.cid,
      updateTime: mockCard3.updateTime,
    });
    expect(res[1]).toEqual({
      cid: mockCard1.cid,
      updateTime: mockCard1.updateTime,
    });
  });
});
