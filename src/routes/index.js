const { Router } = require("express");
const router = Router();

// const Authenticate = require("./authenticate");
const BuildingCapacity = require("./building_capacity");
const Collection = require("./collection");
// const Vehicle = require("./vehicle");
const VehicleType = require("./vehicleType");
const VehiclePrice = require("./vehicle_price");
// const Reservation = require("./reservation");


// router.use("/api/v1/authenticate", Authenticate);
router.use("/api/v1/building_capacity", BuildingCapacity);
router.use("/api/v1/collection", Collection);
// router.use("/api/v1/vehicle", Vehicle);
router.use("/api/v1/vehicleType", VehicleType);
router.use("/api/v1/vehiclePrice", VehiclePrice);
// router.use("/api/v1/reservation", Reservation);


module.exports = router;

