const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const controller = require('../controllers/reservation');
const router = Router();

router.post('/', controller.createReservation);

module.exports = router;
