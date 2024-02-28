import { Knex } from 'knex';
import { generateHash } from '../../src/utils/generate_hash';

// 데이터를 삽입하기 전에 필요에 따라 테이블을 재설정하도록 시드 파일을 디자인해야 함
export async function seed(knex: Knex): Promise<void> {
  // Check if users already exist
  const user1Exists = await knex('users')
    .where('email', 'example1@favmov.com')
    .first();
  const user2Exists = await knex('users')
    .where('email', 'example2@favmov.com')
    .first();

  // If both users do not exist, insert them
  if (!user1Exists) {
    const { salt, hash } = await generateHash('password1');
    await knex('users').insert({
      email: 'example1@favmov.com',
      password: hash,
      salt: salt,
    });
  }

  if (!user2Exists) {
    const { salt, hash } = await generateHash('password2');
    await knex('users').insert({
      email: 'example2@favmov.com',
      password: hash,
      salt: salt,
    });
  }
}
