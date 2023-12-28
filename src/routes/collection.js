const { Router } = require("express");
const router = Router();
const Middlewares = require("../middlewares/validateMiddlewares");
const recaudation = require("../controllers/collection");

router.route("/").get( [Middlewares.validarJWT, Middlewares.checkRoleAdmin], recaudation.getAll );
router.route("/date/:date").get( [Middlewares.validarJWT, Middlewares.checkRoleAdmin], recaudation.getRecaudation ); 
router.route("/date/:date/total").get( [Middlewares.validarJWT, Middlewares.checkRoleAdmin], recaudation.getRecaudationTotal ); 


module.exports = router;
