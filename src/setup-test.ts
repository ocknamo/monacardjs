import * as dotenv from 'dotenv';
import * as path from 'path';

// Set test environment value.
const testEnv = dotenv.config({
  path: path.join(process.cwd(), '.env.test'),
});

Object.assign(process.env, {
  ...testEnv.parsed,
});
