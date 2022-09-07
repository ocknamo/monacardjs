import { Database } from '../class/database';
import { Job } from '../class/job';

import * as dotenv from 'dotenv';

// Setup env
dotenv.config();

async function main(): Promise<void> {
  console.info('[syncBanCardList] Start worker');
  const db = new Database();
  try {
    const job = new Job(db.getConnection());
    await job.syncBanCardList(process.env.URL_SHARE_BAN_LIST);
  } catch (error) {
    console.info('[syncBanCardList] Worker is failed');
    throw error;
  } finally {
    db.tearDown();
  }

  console.info('[syncBanCardList] End');
}

main();
