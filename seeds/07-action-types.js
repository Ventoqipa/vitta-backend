const TABLE_NAME = "action_types";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del()
  await knex(TABLE_NAME).insert([
    {value: 0, label: "unwatched"},
    {value: 1, label: "took"},
    {value: 2, label: "postponed"}
  ]);
};
