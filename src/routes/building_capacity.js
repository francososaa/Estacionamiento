const { Router } = require('express');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const controller = require('../controllers/building_capacity');

router.post('/', controller.newCapacity);

module.exports = router;
