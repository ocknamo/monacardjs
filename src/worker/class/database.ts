import { Card } from '../../entity';
import { Connection, createConnection } from 'typeorm';

// TODO: app.moduleの実装とDRYにする

export class Database {
  private connection: Promise<Connection>;

  constructor() {
    // Todo: Inject from config.
    this.connection = createConnection({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3307,
      username: 'test',
      password: 'password',
      database: 'test',
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
