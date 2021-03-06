const TABLE_NAME = "account_types";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del()
  await knex(TABLE_NAME).insert([
    {value: 0, label: "support"},
    {value: 1, label: "admin"},
    {value: 2, label: "user"}
  ]);
};
