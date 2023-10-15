const { Router } = require('express');
const authenticate = require('../controllers/auth-controller');
const Middlewares = require('../middlewares/middlewares');
const router = Router();

router.post('/register', authenticate.authRegister );
router.post('/login', authenticate.login );
router.get('/logout', Middlewares.validarJWT , authenticate.logout );

module.exports = router;
