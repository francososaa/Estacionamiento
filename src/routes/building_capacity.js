const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const controller = require('../controllers/building_capacity');
const router = Router();

router.post('/createCapacity', controller.addCapacity);

module.exports = router;
