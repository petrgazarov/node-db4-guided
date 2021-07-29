//----------------------------------------------------------------------------//
// CREATE TABLES AND FOREIGN KEY RELATIONSHIPS
//----------------------------------------------------------------------------//
// Tables can have 1-to-1, 1-to-many, or many-to-many "relationships". These
// relationships provide value through the ability to 'JOIN' tables. By using a
// primary key value from Table A as the value of a foreign key field in Table
// B, you "relate" the two records, and using JOIN statements, you can combine
// the related data in a SQL query result.
//
// When creating tables, you should create tables that do not have any foreign
// keys *first*. These are tables that are likely to be "parent" (a.k.a.
// "primary") tables that are referred to by other tables (a.k.a. "child"
// tables). For example, if you try to create the [animals] table, with a
// foreign key field that references the [species] table, but the [species]
// table hasn't been created yet, you will get an error. The [species] table
// needs to be created before you can define a foreign key field in [animals]
// that references it.

// The zoos table doesn't have any foreign keys, so we create it before other
// tables.
exports.up = function(knex) {
  return knex.schema.createTable('zoos', tbl => {
    tbl.increments();
    tbl.string('zoo_name').notNullable().unique();
    tbl.string('address').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('zoos');
};
