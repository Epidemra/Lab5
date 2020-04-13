const Car  = require('./car');

async function getCars(data) {
  const cars = await Car.findAll();
  return cars;
}

async function createCar(args) {
  console.log(args)
  const result = await Car.create(args.carInput)
  console.log('result', result.dataValues);
  return result.dataValues;
}

async function updateCar(args) {
  console.log(args);
  const {id, ...data} = args;
  const car = await Car.update(data, {where: { id: id }});
  console.log('result', car.dataValues);
  return car.dataValues;
}

async function deleteCar({id}) {
  const car = await Car.destroy({where: {id: id}});
  console.log(car)
  return {id : car.id};
}

module.exports = {
  getCars,
  createCar,
  updateCar,
  deleteCar
};
