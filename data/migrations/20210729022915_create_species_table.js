
exports.up = function(knex) {
  return knex.schema.createTable('species', tbl => {
    tbl.increments();
    tbl.string('species_name').notNullable().unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('species');
};
