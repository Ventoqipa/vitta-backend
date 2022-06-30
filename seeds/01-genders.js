/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('gender').del()
  await knex('gender').insert([
    {value: 0, label: "-"},
    {value: 1, label: "masculino"},
    {value: 2, label: "femenino"}
  ]);
};
