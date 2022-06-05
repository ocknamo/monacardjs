import { Database } from './class/database';
import { Job } from './class/job';

async function main(): Promise<void> {
  console.log('[readNewMonacard] Start worker');
  const db = new Database();
  try {
    const job = new Job(db.getConnection());
    await job.readNewMonacard();
  } catch (error) {
    console.info('[readNewMonacard] Worker is failed');
    throw error;
  } finally {
    db.tearDown();
  }

  console.info('[readNewMonacard] End');
}

main();
