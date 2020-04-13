const express = require('express');
const carServices = require("./carService");

const router = express.Router();

router.get('/', carServices.getCars);
router.post("/new", carServices.createCar);
router.put("/edit/:id", carServices.updateCar);
router.delete("/delete/:id", carServices.deleteCar);


module.exports = router;