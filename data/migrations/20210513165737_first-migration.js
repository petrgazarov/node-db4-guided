exports.up = async function(knex) {
  await knex.schema.createTable('zoos', tbl => {
    tbl.increments('zoo_id')
    tbl.string('zoo_name', 30).notNullable()
    tbl.string('zoo_address', 50)
  })

};

exports.down = function(knex) {

};
