
exports.up = function(knex) {
  return knex.schema
    .createTable('zoos', table => {
      table.increments('zoo_id');
      table.string('zoo_name').notNullable().unique();
      table.string('address').notNullable();
    })
    .createTable('species', table => {
      table.increments('species_id');
      table.string('species_name').notNullable();
    })
    .createTable('animals', table => {
      table.increments('animal_id');
      table.string('animal_name');
      table
        .integer('species_id')
        .unsigned()
        .references('species_id')
        .inTable('species')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
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
