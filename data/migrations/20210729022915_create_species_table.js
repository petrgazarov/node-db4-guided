
exports.up = function(knex) {
  // Since the [species] table is referenced by the [animals] table,
  // the [species] table needs to be created first. Note that the
  // migrations have timestamps in their name, which determines the
  // order in which they run.
  return knex.schema.createTable('species', tbl => {
    // Remember that .increments() creates an integer field that is
    // auto-incrementing, not nullable, and unique, and that is
    // specified as the "primary" key field for the table.
    tbl.increments();
    tbl.string('species_name').notNullable().unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('species');
};
