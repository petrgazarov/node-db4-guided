exports.up = async function(knex) {
  await knex.schema.createTable('zoos', tbl => {
    tbl.increments('zoo_id')
    tbl.
  })

};

exports.down = function(knex) {

};
