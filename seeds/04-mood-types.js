const TABLE_NAME = "mood_types";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del()
  await knex(TABLE_NAME).insert([
    {value: 1, label: "terrible"},
    {value: 2, label: "sobad"},
    {value: 3, label: "bad"},
    {value: 4, label: "sad"},
    {value: 5, label: "Well"}
  ]);
};
