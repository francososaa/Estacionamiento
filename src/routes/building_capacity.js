const { Router } = require('express');
const router = Router();
const Middleware = require('../middlewares/middlewares');
const buildingCapacity = require('../controllers/building_capacity');


router.route("/").post( [Middleware.validarJWT, Middleware.checkRoleAdmin], buildingCapacity.newCapacity); 
router.route("/").get( [Middleware.validarJWT, Middleware.checkRoleAdmin], buildingCapacity.getBuildingCapacity);  
router.route("/date/:date/vehicle/:vehicleTypeId").put( [Middleware.validarJWT, Middleware.checkRoleAdmin], buildingCapacity.update); 
router.route("/date/:date/vehicle/:vehicleTypeId").delete( [Middleware.validarJWT, Middleware.checkRoleAdmin], buildingCapacity.destroyCapacity);

module.exports = router;
