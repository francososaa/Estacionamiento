const { Router } = require('express');
const router = Router();
const Middlewares = require('../middlewares/validateMiddlewares');
const reservation = require('../controllers/reservation');

router.post('/', [Middlewares.validarJWT, Middlewares.checkRoleAdminAndUser], reservation.createReservation);

module.exports = router;
