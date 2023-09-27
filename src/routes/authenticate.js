const { Router } = require('express');
const authenticate = require('../controllers/auth-controller');
const {validarJWT} = require('../middlewares/validar-jwt');
const router = Router();

router.post('/register', authenticate.authRegister );
router.post('/login', authenticate.login );
router.get('/logout', validarJWT, authenticate.logout );

module.exports = router;
