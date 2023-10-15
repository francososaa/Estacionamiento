const { Router } = require("express");
const router = Router();
const Middlewares = require('../middlewares/middlewares');
const vehicles = require("../controllers/vehicle");

router.route("/").post([Middlewares.validarJWT, Middlewares.checkRoleAdminAndUser], vehicles.newVehicle); 
router.route("/").get([Middlewares.validarJWT, Middlewares.checkRoleAdminAndUser], vehicles.getAllVehicle);  
router.route("/:id" ).get([Middlewares.validarJWT, Middlewares.checkRoleAdminAndUser], vehicles.findByPk);  
router.route("/license/:license").get([Middlewares.validarJWT, Middlewares.checkRoleAdminAndUser], vehicles.getVehicleByLicense); 
router.route("/:id").put([Middlewares.validarJWT, Middlewares.checkRoleAdminAndUser], vehicles.update);  
router.route("/:id/cancelled").put([Middlewares.validarJWT, Middlewares.checkRoleAdminAndUser], vehicles.cancel); 

module.exports = router;
