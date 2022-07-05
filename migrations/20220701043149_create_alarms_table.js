/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('alarms', function(table) {
        table.increments();
        table.integer('account_id').notNullable().references("id").inTable("accounts").onDelete("CASCADE");
        table.string('illness_code').notNullable().references("code").inTable("illnesses").onDelete("CASCADE");
        table.string('medicine_code').notNullable().references("code").inTable("medicines").onDelete("CASCADE");
        table.boolean("active").notNullable().defaultTo(true);
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
