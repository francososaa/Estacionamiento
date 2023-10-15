const { Router } = require("express");
const router = Router();
const Middleware = require("../middlewares/middlewares");
const recaudation = require("../controllers/collection");

router.route("/").get( recaudation.getAll );
router.route("/date/:date/total").get(  recaudation.getRecaudationTotal ); 
router.route("/date/:date").get( recaudation.getRecaudation ); 


module.exports = router;
