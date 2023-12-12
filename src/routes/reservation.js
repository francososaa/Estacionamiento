const { Router } = require("express");
const router = Router();
const Middlewares = require("../middlewares/validateMiddlewares");
const reservation = require("../controllers/reservation");

router.route("/").post( [Middlewares.validarJWT, Middlewares.checkRoleUser], reservation.createReservation); 
router.route("/:userId").get( [Middlewares.validarJWT, Middlewares.checkRoleUser], reservation.getAllReservationForUser); 
router.route("/:userId/date/:date").put( [Middlewares.validarJWT, Middlewares.checkRoleUser], reservation.update);
router.route("/:userId/date/:date").delete( [Middlewares.validarJWT, Middlewares.checkRoleUser], reservation.destoy);

router.route("/").get( [Middlewares.validarJWT, Middlewares.checkRoleAdmin], reservation.getAll); 

router.route("/employee/date/:date").get( [Middlewares.validarJWT, Middlewares.checkRoleEmployee], reservation.getReservationByDate);
router.route("/employee/date/:date").put( [Middlewares.validarJWT, Middlewares.checkRoleEmployee], reservation.changeStatus);

module.exports = router;
