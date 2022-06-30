/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('account_types').del()
  await knex('account_types').insert([
    {value: 0, label: "support"},
    {value: 1, label: "admin"},
    {value: 2, label: "user"}
  ]);
};
