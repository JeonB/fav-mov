require('ts-node/register');
require('dotenv').config();

// Knex 라이브러리를 사용한 데이터베이스 설정
module.exports = {
  development: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + '/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: __dirname + '/seeds/development',
    },
  },
  testing: {
    client: 'pg',
    connection: {
      connectionString: 'postgres://postgres:password@localhost:5433/fav_mov',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + '/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: __dirname + '/seeds/testing',
    },
  },
};
