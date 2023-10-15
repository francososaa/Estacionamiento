const { Router } = require("express");
const router = Router();
const Middlewares = require('../middlewares/middlewares');
const vehicles = require("../controllers/vehicle");

router.route("/").post([Middlewares.validarJWT, Middlewares.checkRoleAdminAndUser], vehicles.newVehicle);  // crear vehiculo
router.route("/").get([Middlewares.validarJWT, Middlewares.checkRoleAdminAndUser], vehicles.getAllVehicle);  // obtener todos los vehiculos
router.route("/:id" ).get([Middlewares.validarJWT, Middlewares.checkRoleAdminAndUser], vehicles.findByPk);   // obtener vehiculo por id
router.route("/license/:license").get([Middlewares.validarJWT, Middlewares.checkRoleAdminAndUser], vehicles.getVehicleByLicense);   // obtener vehiculo por patente
router.route("/:id").put([Middlewares.validarJWT, Middlewares.checkRoleAdminAndUser], vehicles.update);  // actualizar vehiculo
router.route("/:id/cancelled").put([Middlewares.validarJWT, Middlewares.checkRoleAdminAndUser], vehicles.cancel); // eliminar vehiculo

module.exports = router;
