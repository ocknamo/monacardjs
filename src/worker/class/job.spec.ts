import { CounterpartyClientService } from 'monacardjs/api';
import { mockIssuance } from 'monacardjs/test';
import { Connection } from 'typeorm';
import { Card } from '../../entity';
import { Database } from './database';
import { Job } from './job';

describe('Job', () => {
  let connection: Connection;
  let db: Database;
  let job: Job;
  let mockCpApi: CounterpartyClientService;

  describe('readNewMonacard', () => {
    beforeAll(async () => {
      mockCpApi = {
        getIssuancesTxIndex: jest.fn(),
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
      const mockResponse = new Array(10)
        .fill(mockIssuance)
        .map((v, i) => ({ ...v, asset: v.asset + i }));
      mockCpApi.getIssuancesTxIndex = jest
        .fn()
        .mockReturnValueOnce(mockResponse);
      await job.readNewMonacard();

      const cardRepo = await connection.getRepository(Card);
      const cards = await cardRepo.find();

      expect(cards).toBeDefined();
      expect(cards).toHaveLength(10);
    });

    it('should be fetch and update 10 monacards with same asset name', async () => {
      mockCpApi.getIssuancesTxIndex = jest
        .fn()
        .mockReturnValueOnce([mockIssuance]);

      await job.readNewMonacard();

      const updateMockIssuance = {
        ...mockIssuance,
        asset_longname: 'updated asset longname.',
      };

      mockCpApi.getIssuancesTxIndex = jest
        .fn()
        .mockReturnValueOnce([updateMockIssuance]);

      await job.readNewMonacard();

      const cardRepo = await connection.getRepository(Card);
      const cards = await cardRepo.find();
      expect(cards).toHaveLength(1);
      expect(cards[0].assetLongname).toBe('updated asset longname.');
    });
  });
});
