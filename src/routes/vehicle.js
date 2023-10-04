const { Router } = require("express");
const router = Router();
const { validarJWT } = require("../middlewares/validar-jwt");
const vehicles = require("../controllers/vehicle");

router.route("/").post( vehicles.newVehicle);
router.route("/").get( vehicles.getAllVehicle);
router.route("/:id" ).get(vehicles.findByPk);
router.route("/:id/cancelled").put(vehicles.cancel);
router.route("/:id").put(vehicles.update);
router.route("/license/:license").get( vehicles.getVehicleByLicense);

module.exports = router;
