const jwt = require('jsonwebtoken');
const { db } = require('../db/dataBase');
const User = db.user;

class Middlewares{
    constructor() {};

    async validarJWT( req, res, next ){ 
        const token = req.header('authentication');
       
        if( !token ) return res.status(401).send({ message: 'You are not an authenticated user to make this request' }); 
     
        try {
            const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
            const user = await User.findByPk( uid );
            if ( !user ) return res.status(401).send({ message: 'Token invalid - no user exists' }) 
            
            req.user = user;
        } catch (error) {
            return res.status(400).send({ message: 'Invalid token' })
        };

        next();
    };

    async checkRoleAdminAndUser( req, res, next ){ 
        const roleId = req.user.roleId;
    
        if( roleId === 3 ) return res.status(401).send({ message: 'You do not have access to make this request' }); 
        next();
    };

    async checkRoleAdmin( req, res, next ){ 
        const roleId = req.user.roleId;
    
        if( roleId !== 1 ) return res.status(401).send({ message: 'You do not have access to make this request' }); 
        next();
    };

    async checkRoleUser( req, res, next ){ 
        const roleId = req.user.roleId;
    
        if( roleId !== 2 ) return res.status(401).send({ message: 'You do not have access to make this request' }); 
        next();
    };

    async checkRoleEmployee( req, res, next ){ 
        const roleId = req.user.roleId;
    
        if( roleId !== 3 ) return res.status(401).send({ message: 'You do not have access to make this request' }); 
        next();
    };
    
};

module.exports = new Middlewares();

