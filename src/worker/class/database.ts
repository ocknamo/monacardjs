import { Card } from '../../entity';
import { Connection, createConnection } from 'typeorm';

export class Database {
  private connection: Promise<Connection>;

  constructor() {
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

  async tearDown(): Promise<void> {
    const connection = await this.connection;
    connection.close();
  }
}
