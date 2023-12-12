const { Router } = require("express");
const router = Router();
const Middleware = require("../middlewares/validateMiddlewares");
const reservation = require("../controllers/reservation");

router.route("/").post( [Middleware.validarJWT, Middleware.checkRoleAdminAndUser], reservation.createReservation); 
router.route("/:userId").get( [Middleware.validarJWT, Middleware.checkRoleAdminAndUser], reservation.getAllReservationForUser);
router.route("/:date").put( [Middleware.validarJWT, Middleware.checkRoleAdminAndUser], reservation.update);
router.route("/:date").delete( [Middleware.validarJWT, Middleware.checkRoleAdminAndUser], reservation.destoy);

router.route("/").get( [Middleware.validarJWT, Middleware.checkRoleAdmin], reservation.getAll);

router.route("/employee/:date").get( [Middleware.validarJWT, Middleware.checkRoleEmployee], reservation.getReservationByDate);
router.route("/employee/:date").put( [Middleware.validarJWT, Middleware.checkRoleEmployee], reservation.changeStatus);

module.exports = router;
