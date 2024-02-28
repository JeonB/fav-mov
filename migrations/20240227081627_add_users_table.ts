import type { Knex } from 'knex';
// Knex는 SQL 쿼리 생성 기능 및 데이터베이스 마이그레이션 기능을 제공하는 라이브러리이다
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('salt').notNullable(); // salt :소금으로 양념치듯이 원문에 가미하여 암호문을 다른 값으로 만드는 것
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
