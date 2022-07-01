/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('doses', function(table) {
        table.increments();
        table.integer('alarm_id').notNullable().references("id").inTable("alarms").onDelete("CASCADE");
        table.integer('dose_type').notNullable().references("value").inTable("dose_types").onDelete("CASCADE");
        table.integer('icon_type').notNullable().references("value").inTable("icon_types").onDelete("CASCADE");
        table.integer('measurement_type').notNullable().references("value").inTable("measurement_types").onDelete("CASCADE");
        table.float('quantity').notNullable();
        table.integer('grammage').notNullable();
        table.integer('period').notNullable();
        table.integer('duration').notNullable();
        table.timestamp('first_take').notNullable();
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
