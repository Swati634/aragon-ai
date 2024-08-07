exports.up = function (knex) {
  return knex.schema
    .createTable('Users', function (table) {
      table.increments('id').primary();
      table.string('username').unique().notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('Boards', function (table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('Users').onDelete('CASCADE');
      table.string('name').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('Columns', function (table) {
      table.increments('id').primary();
      table.integer('board_id').unsigned().references('id').inTable('Boards').onDelete('CASCADE');
      table.string('name').notNullable();
      table.integer('position').notNullable();
      table.integer('color').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('Tasks', function (table) {
      table.increments('id').primary();
      table.integer('column_id').unsigned().references('id').inTable('Columns').onDelete('CASCADE');
      table.string('title').notNullable();
      table.text('description');
      table.integer('position').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('Subtasks', function (table) {
      table.increments('id').primary();
      table.integer('task_id').unsigned().references('id').inTable('Tasks').onDelete('CASCADE');
      table.string('title').notNullable();
      table.boolean('completed').defaultTo(false);
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('Subtasks')
    .dropTableIfExists('Tasks')
    .dropTableIfExists('Columns')
    .dropTableIfExists('Boards')
    .dropTableIfExists('Users');
};
