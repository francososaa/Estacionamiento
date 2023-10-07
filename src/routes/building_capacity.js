const { Router } = require('express');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const buildingCapacity = require('../controllers/building_capacity');


router.route("/").post( buildingCapacity.newCapacity); 
router.route("/").get( buildingCapacity.getBuildingCapacity);  
router.route("/date/:date/vehicle/:vehicleTypeId").put( buildingCapacity.update); 
router.route("/date/:date/vehicle/:vehicleTypeId").delete( buildingCapacity.destroyCapacity);

module.exports = router;
