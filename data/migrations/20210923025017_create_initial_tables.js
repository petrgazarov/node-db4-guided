
exports.up = function(knex) {
  return knex.schema
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
    .createTable('zoos', table => {
      table.increments('zoo_id');
      table.string('zoo_name').notNullable().unique();
      table.string('address').notNullable();
    })
    // Since the [species] table is referenced by the [animals] table,
    // the [species] table needs to be created first. Note that the
    // migrations have timestamps in their name, which determines the
    // order in which they run.
    .createTable('species', table => {
      // Remember that .increments() creates an integer field that is
      // auto-incrementing, not nullable, and unique, and that is
      // specified as the "primary" key field for the table.
      table.increments('species_id');
      table.string('species_name').notNullable();
    })
    .createTable('animals', table => {
      table.increments('animal_id');
      table.string('animal_name');
      table
        //------------------------------------------------------------//
        // DEFINING A FOREIGN KEY FIELD USING KNEX - ENSURING
        // REFERENTIAL INTEGRITY
        //------------------------------------------------------------//
        // The "species_id" field is a foreign key field. There are
        // multiple ways to define a foreign key field using knex. They
        // all have these things in common:
        //
        //   1. The field definition identifies the "parent" table, and
        //      the primary key field or column in that parent table
        //      that the foreign key field referenes.
        //   2. The field type must match the field type of the primary
        //      key field in the primary table. Primary keys that are
        //      integers are always *unsigned* (which means that they
        //      are never negative numbers). When defining a matching
        //      foreign key field that references a primary key
        //      that is an integer, be sure to make it .unsigned().
        //   3. The default behavior of the database when a record is
        //      deleted from the primary table, and the primary key for
        //      that record is used as a foreign key value in other
        //      "child" tables, is to disallow the delete request and
        //      throw an error. This is also true if the primary key
        //      value is *modified* (or updated) - changing a primary
        //      key value has the same effect as deleting the record,
        //      and creating a new record with a different primary key
        //      value. You can override this default "disallow" behavior
        //      by using the .onDelete() and .onUpdate() methods. The
        //      string values you can pass to these methods are outlined
        //      below, where .onDelete() and .onUpdate() are called. See
        //      documentation for the "foreign()" method at
        //      https://knexjs.org.
        .integer('species_id')
        .unsigned()
        .references('species_id')
        .inTable('species')
        //--------------------------------------------------------//
        // VALUES FOR .onDelete() AND .onUpdate()
        //--------------------------------------------------------//
        // The .onDelete() and .onUpdate() methods allow us to
        // control how the database handles delete and update
        // requests for records with primary keys that are used (or
        // "referred to") by child tables. The following values can
        // be passed in to .onDelete() and .onUpdate():
        //
        //   * RESTRICT - this is the default if you don't call
        //     .onDelete() or .onUpdate(). You may choose to call
        //     those methods and pass 'RESTRICT' anyway, just to
        //     make it clear that you intend for that to be the
        //     behavior (as opposed to just forgetting what the
        //     default behavior is, or unknowingly accepting the
        //     default.)
        //   * CASCADE - this causes the database to find and delete
        //     all records in child tables that reference the
        //     primary record being deleted. The delete request in
        //     the primary table is "cascaded" to all child tables
        //     that reference the priamary record's key. This is the
        //     most destructive option.
        //   * SET NULL - this causes the database to find all
        //     records in child tables that reference the primary
        //     record being deleted, and to set their foreign key
        //     field values to "null" (for the foreign key that
        //     references the record being deleted.) This helps
        //     ensure that there are no child records that refer to the
        //     primary record being deleted. NOTE: This could have
        //     unintended consequences if you have defined a foreign
        //     key field as .notNullable()... be careful!
        //   * NO ACTION - this causes the database to allow the
        //     deletion of the primary record, without taking any
        //     other action. This will break referential
        //     integrity! You will have records in child tables
        //     that are referring to a record in a parent table
        //     *that does not exist*. It is rarely an appropriate
        //     solution.
        //
        // Here, we set the delete and update behavior for parent
        // tables to 'CASCADE'.
        //
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    //----------------------------------------------------------------//
    // CREATE A BRIDGE TABLE FOR THE MANY-TO-MANY RELATIONSHIP
    //----------------------------------------------------------------//
    // In our example, zoos and animals are related, but there can be
    // many zoos for any given animal, and of course, many animals for
    // any given zoo. Since a foreign key field can only have 1 value,
    // putting foreign key fields in each table won't work. We need a
    // third table. For us, it's the [zoo_animals] table. Bridge tables
    // are often named using the names of the 2 tables that the bridge
    // is for, but it is not always the case.
    //
    // This table will have 2 foreign key fields, one for each of the
    // tables that are being related. Each record in the bridge table
    // will represent a relationship between a record in each parent
    // table.
    //
    .createTable('zoo_animals', table => {
      table.increments('zoo_animal_id');
      table.bool('is_current');

      table
        .integer('zoo_id')
        .unsigned()
        .references('zoo_id')
        .inTable('zoos')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      table
        .integer('animal_id')
        .unsigned()
        .references('animal_id')
        .inTable('animals')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('zoo_animals')
    .dropTableIfExists('animals')
    .dropTableIfExists('species')
    .dropTableIfExists('zoos')
};
