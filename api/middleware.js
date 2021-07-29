const helpers = require('./model');

const checkSpeciesExists = async (req, res, next) => {
  const species = await helpers.getSpeciesById(req.params.species_id);

  if (!species) {
    res.status(404).json({ message: 'Record not found' });
    return;
  }

  next();
};

module.exports = {
  checkSpeciesExists,
};