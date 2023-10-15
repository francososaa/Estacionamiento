const { Router } = require('express');
const Middlewares = require('../middlewares/middlewares');
const controller = require('../controllers/reservation');
const router = Router();

router.post('/', [Middlewares.validarJWT, Middlewares.checkRoleAdminAndUser], controller.createReservation);

module.exports = router;
