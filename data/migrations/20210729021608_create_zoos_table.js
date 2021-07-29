
exports.up = function(knex) {
  return knex.schema.createTable('zoos', tbl => {
    tbl.increments();
    tbl.string('zoo_name').notNullable().unique();
    tbl.string('address').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('zoos');
};
