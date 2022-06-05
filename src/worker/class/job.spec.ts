import { Connection } from 'typeorm';
import { Card } from '../../entity';
import { Database } from './database';
import { Job } from './job';

describe('Job', () => {
  let connection: Connection;
  let db: Database;
  let job: Job;
  describe('readNewMonacard', () => {
    beforeAll(async () => {
      db = new Database();
      job = new Job(db.getConnection());
      connection = await db.getConnection();
      connection.synchronize(true);
    });

    afterAll(async () => {
      await db.tearDown();
    });

    it('should be fetch and set 1000 monacards', async () => {
      await job.readNewMonacard();

      const cardRepo = await connection.getRepository(Card);
      const cards = await cardRepo.find();

      expect(cards).toBeDefined();
    });
  });
});
