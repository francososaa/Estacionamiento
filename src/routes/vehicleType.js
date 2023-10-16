const { Router } = require("express");
const router = Router();
const Middleware = require("../middlewares/validateMiddlewares");
const vehicleType = require("../controllers/vehicleType");

router.route("/").post( [Middleware.validarJWT, Middleware.checkRoleAdmin], vehicleType.newVehicleType);  
router.route("/").get( [Middleware.validarJWT, Middleware.checkRoleAdmin], vehicleType.getAllVehicle); 
router.route("/:id").put( [Middleware.validarJWT, Middleware.checkRoleAdmin], vehicleType.update); 
router.route("/:id").delete( [Middleware.validarJWT, Middleware.checkRoleAdmin],  vehicleType.destroy); 


module.exports = router;
