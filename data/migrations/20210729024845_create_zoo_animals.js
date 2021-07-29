
exports.up = function(knex) {
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
  return knex.schema.createTable('zoo_animals', tbl => {
    tbl.increments();
    tbl
      .integer('zoo_id')
      .unsigned()
      .references('zoos.id')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl
      .integer('animal_id')
      .unsigned()
      .references('animals.id')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('zoo_animals');
};
