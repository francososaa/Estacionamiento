const { Router } = require('express');
const router = Router();
const Middlewares = require('../middlewares/middlewares');
const controller = require('../controllers/reservation');

router.post('/', [Middlewares.validarJWT, Middlewares.checkRoleAdminAndUser], controller.createReservation);

module.exports = router;
