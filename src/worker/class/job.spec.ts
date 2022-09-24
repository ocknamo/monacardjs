import {
  CounterpartyClientService,
  getMockCard,
  mockAssetInfo,
} from '@monacardjs/lib';
import { mockIssuance } from '@monacardjs/lib';
import axios from 'axios';
import { Connection } from 'typeorm';
import { Card } from '../../entity';
import { Database } from './database';
import { Job } from './job';

describe('Job', () => {
  let connection: Connection;
  let db: Database;
  let job: Job;

  describe('readNewMonacard', () => {
    let mockCpApi: CounterpartyClientService;
    beforeAll(async () => {
      mockCpApi = {
        getIssuancesTxIndex: jest.fn(),
        getAssetInfos: jest.fn(),
      } as unknown as CounterpartyClientService;
      db = new Database();
      job = new Job(db.getConnection(), mockCpApi);
      connection = await db.getConnection();
    });

    beforeEach(async () => {
      await connection.createEntityManager().clear(Card);
    });

    afterAll(async () => {
      await db.tearDown();
    });

    it('should be fetch and set 10 monacards', async () => {
      const mockIssuanceResponse = new Array(10)
        .fill(mockIssuance)
        .map((v, i) => ({ ...v, asset: v.asset + i }));
      const mockInfosResponse = new Array(10)
        .fill(mockAssetInfo)
        .map((v, i) => ({ ...v, asset: v.asset + i }));

      mockCpApi.getIssuancesTxIndex = jest
        .fn()
        .mockReturnValueOnce(mockIssuanceResponse);

      mockCpApi.getAssetInfos = jest
        .fn()
        .mockReturnValueOnce(mockInfosResponse);

      await job.readNewMonacard();

      const cardRepo = await connection.getRepository(Card);
      const cards = await cardRepo.find();

      expect(cards).toBeDefined();
      expect(cards).toHaveLength(10);
    });

    it('should be fetch and update a monacard with same asset name', async () => {
      mockCpApi.getIssuancesTxIndex = jest.fn().mockReturnValue([mockIssuance]);
      mockCpApi.getAssetInfos = jest
        .fn()
        .mockReturnValueOnce([{ ...mockAssetInfo, asset: mockIssuance.asset }]);

      await job.readNewMonacard();

      const updateMockInfo = {
        ...mockAssetInfo,
        asset: mockIssuance.asset,
        asset_longname: 'updated asset longname.',
      };

      mockCpApi.getAssetInfos = jest.fn().mockReturnValueOnce([updateMockInfo]);

      await job.readNewMonacard();

      const cardRepo = await connection.getRepository(Card);
      const cards = await cardRepo.find();
      expect(cards).toHaveLength(1);
      expect(cards[0].assetLongname).toBe('updated asset longname.');
    });
  });

  describe('syncBanCardList', () => {
    jest.mock('axios');
    const getApiMock = jest.spyOn(axios, 'get').mockName('axios-get');
    const mockBanList = [
      {
        asset: 'A7329867067985527843',
        status: 'displeasure',
        update_time: '1656051227',
      },
      {
        asset: 'KISHIDASOURI',
        status: 'publicity',
        update_time: '1653739990',
      },
      {
        asset: 'A1889336827968921143',
        status: 'delete',
        update_time: '1649835871',
      },
    ];

    beforeAll(async () => {
      db = new Database();
      job = new Job(db.getConnection());
      connection = await db.getConnection();
    });

    beforeEach(async () => {
      await connection.createEntityManager().clear(Card);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    afterAll(async () => {
      await db.tearDown();
    });
    it('Do nothing when banlistUrl is not set.', async () => {
      await job.syncBanCardList();
      expect(getApiMock).not.toHaveBeenCalled();
      await job.syncBanCardList('');
      expect(getApiMock).not.toHaveBeenCalled();
    });

    it('Should throw error when banlistUrl is invalid.', async () => {
      await expect(job.syncBanCardList('invalid_url')).rejects.toThrowError();
      expect(getApiMock).toHaveBeenCalled();
    });

    it('Should throw error when response data is falsy.', async () => {
      getApiMock.mockResolvedValueOnce({ data: null });
      await expect(job.syncBanCardList('valid_url')).rejects.toThrowError(
        'Faid to connect API.',
      );
      expect(getApiMock).toHaveBeenCalledWith('valid_url');
    });

    it('Should get ban list from url and set status to DB.', async () => {
      let mockCards: Card[] = [];

      // target cards
      for (let i = 0; i < 3; i++) {
        mockCards[i] = getMockCard(String(i));
        mockCards[i].asset = mockBanList[i].asset;
        mockCards[i].status = 'good';
      }

      // non target card
      mockCards[3] = getMockCard('3');
      mockCards[3].status = 'good';

      const cardRepo = connection.getRepository(Card);
      mockCards = await cardRepo.save(mockCards);
      expect(mockCards[0].status).toBe('good');
      expect(mockCards[1].status).toBe('good');
      expect(mockCards[2].status).toBe('good');
      expect(mockCards[3].status).toBe('good');

      getApiMock.mockResolvedValueOnce({ data: { list: mockBanList } });
      await job.syncBanCardList('valid_url');
      expect(getApiMock).toHaveBeenCalledWith('valid_url');

      const results = await cardRepo.createQueryBuilder().getMany();

      // targets
      const res1 = results.find((res) => res.asset === mockCards[0].asset);
      expect(res1?.status).toBe(mockBanList[0].status);
      const res2 = results.find((res) => res.asset === mockCards[1].asset);
      expect(res2?.status).toBe(mockBanList[1].status);
      const res3 = results.find((res) => res.asset === mockCards[2].asset);
      expect(res3?.status).toBe(mockBanList[2].status);

      // non target
      const res4 = results.find((res) => res.asset === mockCards[3].asset);
      expect(res4?.status).toBe('good');
    });
  });
});
