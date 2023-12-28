const { Router } = require('express');
const router = Router();
const Middlewares = require('../middlewares/validateMiddlewares');
const buildingCapacity = require('../controllers/building_capacity');


router.route("/").post( [Middlewares.validarJWT, Middlewares.checkRoleAdmin], buildingCapacity.newCapacity); 
router.route("/").get( [Middlewares.validarJWT, Middlewares.checkRoleAdmin], buildingCapacity.getBuildingCapacity);  
router.route("/date/:date/vehicle/:vehicleTypeId").put( [Middlewares.validarJWT, Middlewares.checkRoleAdmin], buildingCapacity.update); 
router.route("/date/:date/vehicle/:vehicleTypeId").delete( [Middlewares.validarJWT, Middlewares.checkRoleAdmin], buildingCapacity.destroyCapacity);

module.exports = router;
