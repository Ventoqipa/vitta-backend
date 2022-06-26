/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('users').del()
  await knex('users').insert([
    {id: 1, name: 'rowValue1', email: "sahj@live.com.mx", birthday: "07-01-1991", password: "123456", gender: 1}
  ]);
};
