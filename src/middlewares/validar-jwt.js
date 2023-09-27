const jwt = require('jsonwebtoken');
const { db } = require('../db/dataBase');
const User = db.user;

const validarJWT = async ( req, res, next ) => { 
    const token = req.header('authentication');
   
    if( !token ) return res.status(401).send({ message: 'You are not an authenticated user to make this request' }); 
 
    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const user = await User.findByPk( uid );
        if ( !user ) return res.status(401).send({ message: 'Token invalid - no user exists' }) 
        
        req.user = user;
    } catch (error) {
        return res.status(400).send({ message: 'Invalid token' })
    }
    next();
};

module.exports = {
    validarJWT
};
