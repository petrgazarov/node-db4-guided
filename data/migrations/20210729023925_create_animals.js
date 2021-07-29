
exports.up = function(knex) {
  return knex.schema.createTable('animals', tbl => {
    tbl.increments();
    tbl.string('animal_name').notNullable().unique();
    tbl
      .integer('species_id')
      .unsigned()
      .references('species.id')
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('animals');
};