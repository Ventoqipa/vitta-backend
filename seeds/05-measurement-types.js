const TABLE_NAME = "measurement_types";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del()
  await knex(TABLE_NAME).insert([
    {value: 0, label: "unknown"},
    {value: 1, label: "ug"},
    {value: 2, label: "mg"},
    {value: 3, label: "g"},
    {value: 4, label: "ml"}
  ]);
};
