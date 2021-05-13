exports.up = async function(knex) {
  await knex.schema.createTable('zoos', tbl => {
    tbl.increments('zoo_id')
    tbl.string('zoo_name', 30)
    tbl.
  })

};

exports.down = function(knex) {

};
