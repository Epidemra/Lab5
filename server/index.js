const carService = require('./carService');

const rootResolver = {
  ...carService
};

module.exports = rootResolver;