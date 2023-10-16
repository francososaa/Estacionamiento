const { Router } = require("express");
const router = Router();
const Middleware = require("../middlewares/validateMiddlewares");
const recaudation = require("../controllers/collection");

router.route("/").get( [Middleware.validarJWT, Middleware.checkRoleAdmin], recaudation.getAll );
router.route("/date/:date/total").get( [Middleware.validarJWT, Middleware.checkRoleAdmin], recaudation.getRecaudationTotal ); 
router.route("/date/:date").get( [Middleware.validarJWT, Middleware.checkRoleAdmin], recaudation.getRecaudation ); 


module.exports = router;
