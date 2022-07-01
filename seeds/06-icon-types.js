const TABLE_NAME = "icon_types";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del()
  await knex(TABLE_NAME).insert([
    {value: 0, label: "default"},
    {value: 1, label: "frasco"},
    {value: 2, label: "tubo"},
    {value: 3, label: "gotero"},
    {value: 4, label: "capsula"},
    {value: 5, label: "caja"},
    {value: 6, label: "jeringa"},
    {value: 7, label: "pastilla"},
    {value: 8, label: "tablilla"}
  ]);
};
