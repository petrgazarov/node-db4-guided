
exports.up = function(knex) {
  return knex.schema
    .createTable('zoos', table => {

    })
    .createTable('species', table => {
      
    })
    .createTable('animals', table => {
      
    })
    .createTable('animals_zoos', table => {

    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('animals_zoos')
    .dropTableIfExists('animals')
    .dropTableIfExists('species')
    .dropTableIfExists('zoos')
};
