const { Router } = require("express");
const router = Router();
const Middlewares = require("../middlewares/validateMiddlewares");
const vehiclePrice = require("../controllers/vehicle_price");

router.route("/").post( [Middlewares.validarJWT, Middlewares.checkRoleAdmin], vehiclePrice.newVehiclePrice);
router.route("/").get( [Middlewares.validarJWT, Middlewares.checkRoleAdmin], vehiclePrice.getAll);
router.route("/").put( [Middlewares.validarJWT, Middlewares.checkRoleAdmin], vehiclePrice.update);

module.exports = router;
