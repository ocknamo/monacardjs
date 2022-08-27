module.exports = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  entities: ['src/entity/*.ts'],
  migrationsTableName: 'custom_migration_table',
  migrations: ['migration/*.ts'],
  cli: {
    migrationsDir: 'migration',
  },
};
