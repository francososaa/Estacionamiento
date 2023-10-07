const { Router } = require("express");
const router = Router();
const { validarJWT } = require("../middlewares/validar-jwt");
const vehicles = require("../controllers/vehicle");

router.route("/").post( vehicles.newVehicle);  // crear vehiculo
router.route("/").get( vehicles.getAllVehicle);  // obtener todos los vehiculos
router.route("/:id" ).get(vehicles.findByPk);   // obtener vehiculo por id
router.route("/license/:license").get( vehicles.getVehicleByLicense);   // obtener vehiculo por patente
router.route("/:id").put(vehicles.update);  // actualizar vehiculo
router.route("/:id/cancelled").put(vehicles.cancel); // eliminar vehiculo

module.exports = router;
