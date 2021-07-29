const db = require('../data/db-config.js');

function getSpecies() {
  return db('species');
}

function getSpeciesById(id) {
  return db('species').where({ id }).first();
}

function getAnimals() { // INCLUDING SPECIES NAME
  return db('animals as a')
    .leftJoin('species as s', 's.id', 'a.species_id')
    .select('a.id', 'a.animal_name', 's.species_name');
}

async function createAnimal(animal) {
  const [id] = await db('animals').insert(animal);
  return getAnimals().where({ id }).first();
}

function deleteSpecies(id) {
  return db('species').where({ id }).del();
}

module.exports = {
  getSpecies,
  getSpeciesById,
  getAnimals,
  createAnimal,
  deleteSpecies,
};
