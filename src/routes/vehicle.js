const { Router } = require("express");
const router = Router();
const Middlewares = require('../middlewares/validateMiddlewares');
const vehicles = require("../controllers/vehicle");

router.route("/").post( [Middlewares.validarJWT, Middlewares.checkRoleUser], vehicles.newVehicle); 
router.route("/:userId").get( [Middlewares.validarJWT, Middlewares.checkRoleUser], vehicles.getAllVehicle);  
router.route("/:userId/:id" ).get( [Middlewares.validarJWT, Middlewares.checkRoleUser], vehicles.findByPk);  
router.route("/:userId/:id").put( [Middlewares.validarJWT, Middlewares.checkRoleUser], vehicles.update);  
router.route("/:userId/cancelled/:id").put( [Middlewares.validarJWT, Middlewares.checkRoleUser], vehicles.cancel); 
router.route("/:userId/license/:license").get( [Middlewares.validarJWT, Middlewares.checkRoleUser], vehicles.getVehicleByLicense); 

module.exports = router;
