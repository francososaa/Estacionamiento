const { Router } = require("express");
const router = Router();
const { validarJWT } = require("../middlewares/validar-jwt");
const vehicleType = require("../controllers/vehicleType");

router.route("/").post( vehicleType.newVehicleType);  
router.route("/").get( vehicleType.getAllVehicle); 
router.route("/:id" ).get(vehicleType.findByPk);  
router.route("/:id").put( vehicleType.update); 
router.route("/:id").delete( vehicleType.destroy); 


module.exports = router;
