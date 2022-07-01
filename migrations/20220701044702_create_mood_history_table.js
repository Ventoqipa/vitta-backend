/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('mood_history', function(table) {
        table.increments();
        table.integer('alarm_id').notNullable().references("id").inTable("alarms").onDelete("CASCADE");
        table.integer('mood_type').notNullable().references("value").inTable("mood_types").onDelete("CASCADE");
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
