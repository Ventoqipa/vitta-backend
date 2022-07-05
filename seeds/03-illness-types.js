const TABLE_NAME = "illnesses";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del()
  await knex(TABLE_NAME).insert([
    {code: 0, name: "Dolor de cabeza"}
  ]);
};
