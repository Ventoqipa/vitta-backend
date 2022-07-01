const TABLE_NAME = 'users';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    if( !(await knex.schema.hasTable(TABLE_NAME)) ) {
        return knex.schema.createTable(TABLE_NAME, (table) => {
            table.increments();
            table.string('name').notNullable();
            table.string('email').notNullable();
            table.date('birthday').notNullable();
            table.string('password').notNullable();
            table.tinyint('gender').notNullable().defaultTo(0).references("value").inTable("gender").onDelete("CASCADE");
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())
        });
    }
    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
