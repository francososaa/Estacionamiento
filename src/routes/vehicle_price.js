const { Router } = require('express');
const router = Router();
const Middleware = require('../middlewares/validateMiddlewares');
const vehiclePrice = require('../controllers/vehicle_price');

router.post('/', [Middleware.validarJWT, Middleware.checkRoleAdmin], vehiclePrice.newVehiclePrice);
router.get('/', [Middleware.validarJWT, Middleware.checkRoleAdmin], vehiclePrice.getAll);
router.put('/', [Middleware.validarJWT, Middleware.checkRoleAdmin], vehiclePrice.update);

module.exports = router;
