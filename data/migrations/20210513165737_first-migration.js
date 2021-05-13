exports.up = async function (knex) {
  await knex.schema
    .createTable('zoos', tbl => {
      tbl.increments('zoo_id')
      tbl.string('zoo_name', 30).notNullable().unique()
      tbl.string('address', 50).notNullable().unique()
    })
    .createTable('species', tb => {
      tbl.increments('species_id')
      tbl.string('species_name').notNullable().unique()
    })

};

exports.down = function (knex) {

};
