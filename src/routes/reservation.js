const { Router } = require("express");
const router = Router();
const Middlewares = require("../middlewares/validateMiddlewares");
const reservation = require("../controllers/reservation");

router.route("/").post( [Middlewares.validarJWT, Middlewares.checkRoleAdminAndUser], reservation.createReservation); 
router.route("/:userId").get( [Middlewares.validarJWT, Middlewares.checkRoleAdminAndUser], reservation.getAllReservationForUser);
router.route("/:date").put( [Middlewares.validarJWT, Middlewares.checkRoleAdminAndUser], reservation.update);
router.route("/:date").delete( [Middlewares.validarJWT, Middlewares.checkRoleAdminAndUser], reservation.destoy);

router.route("/").get( [Middlewares.validarJWT, Middlewares.checkRoleAdmin], reservation.getAll);

module.exports = router;
