
exports.up = function(knex) {
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
