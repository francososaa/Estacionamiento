const { Router } = require('express');
const router = Router();
const Middlewares = require('../middlewares/validateMiddlewares');
const authenticate = require('../controllers/auth-controller');

router.post('/register', authenticate.authRegister );
router.post('/login', authenticate.login );
router.get('/logout', Middlewares.validarJWT , authenticate.logout );

module.exports = router;
