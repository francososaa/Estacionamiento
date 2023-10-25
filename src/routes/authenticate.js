const { Router } = require("express");
const router = Router();
const Middlewares = require("../middlewares/validateMiddlewares");
const authenticate = require("../controllers/auth-controller");

router.route("/register").post( authenticate.authRegister );
router.route("/login").post( authenticate.login );
router.route("/logout").get( Middlewares.validarJWT , authenticate.logout );

module.exports = router;
