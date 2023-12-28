const { Router } = require("express");
const router = Router();
const Middlewares = require("../middlewares/validateMiddlewares");
const vehicleType = require("../controllers/vehicleType");

router.route("/").post( [Middlewares.validarJWT, Middlewares.checkRoleAdmin], vehicleType.newVehicleType);  
router.route("/").get( [Middlewares.validarJWT, Middlewares.checkRoleAdmin], vehicleType.getAllVehicle); 
router.route("/:id").put( [Middlewares.validarJWT, Middlewares.checkRoleAdmin], vehicleType.update); 
router.route("/:id").delete( [Middlewares.validarJWT, Middlewares.checkRoleAdmin],  vehicleType.destroy); 


module.exports = router;
