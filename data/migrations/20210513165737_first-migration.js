exports.up = async function (knex) {
  await knex.schema
    .createTable('zoos', tbl => {
      tbl.increments('zoo_id')
      tbl.string('zoo_name', 30).notNullable().unique()
      tbl.string('address', 50).notNullable().unique()
    })
    .createTable('species', tbl => {
      tbl.increments('species_id')
      tbl.string('species_name').notNullable().unique()
    })
    .createTable('animals', tbl => {
      tbl.increments('animal_id')
      tbl.string('animal_name').notNullable()
      tbl.integer('species_id')
        .unsigned()
        .notNullable()
        .references('species_id')
        .inTable('species')
        .onDelete('CASCADE')
        .onUpdate('CASCADE') // YOU WON'T NEED IT!!!!
    })
    .createTable('zoo_animals', tbl => {
      tbl.increments('zoo_animal_id')
      tbl.integer('zoo_id')
        .unsigned()
        .notNullable()
        .references('zoo_id')
        .inTable('zoos')
        .onDelete('CASCADE')
        .onUpdate('CASCADE') // YOU WON'T NEED IT!!!!
      tbl.integer('animal_id')
        .unsigned()
        .notNullable()
        .references('animal_id')
        .inTable('animals')
        .onDelete('CASCADE')
        .onUpdate('CASCADE') // YOU WON'T NEED IT!!!!
    })
};

exports.down = async function (knex) {
  await knex.schema
    .dropTableIfExists('zoo_animals')
    .dropTableIfExists('animals')
    .dropTableIfExists('species')
    .dropTableIfExists('zoos')
};
