const TABLE_NAME = 'accounts';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    if( !(await knex.schema.hasTable(TABLE_NAME)) ) {
        return knex.schema.createTable(TABLE_NAME, function(table) {
            table.increments();
            table.integer('user_id').notNullable().references("id").inTable("users").onDelete("CASCADE");
            table.integer('account_type').notNullable().references("value").inTable("account_types").onDelete("CASCADE");
            table.boolean('is_active').notNullable();
            table.timestamp('last_login').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        });
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
