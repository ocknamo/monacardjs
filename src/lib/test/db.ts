import { Card } from '../../entity';
import {
  Connection,
  createConnection,
  EntityTarget,
  Repository,
} from 'typeorm';

export class TestDatabase {
  private connection: Promise<Connection>;

  constructor() {
    // Test database
    this.connection = createConnection({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Card],
      synchronize: false,
    });
  }

  /**
   * getConnection
   */
  getConnection(): Promise<Connection> {
    return this.connection;
  }

  /**
   * getRepository
   */
  async getRepository<T>(entity: EntityTarget<T>): Promise<Repository<T>> {
    const con = await this.connection;

    return con.getRepository(entity);
  }

  async tearDown(): Promise<void> {
    const connection = await this.connection;
    connection.close();
  }
}
