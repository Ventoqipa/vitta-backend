/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.date('birthday').notNullable();
        table.string('password').notNullable();
        table.tinyint('gender').notNullable().defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
