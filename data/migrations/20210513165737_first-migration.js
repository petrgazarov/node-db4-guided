exports.up = async function(knex) {
  await knex.schema.createTable('zoos')
    
};

exports.down = function(knex) {

};
