const jwt = require('jsonwebtoken');
const userService = require("../services/user.service");

class Middlewares{
    constructor() {};

    async validarJWT( req, res, next ){ 
        const token = req.header('authentication');
       
        if( !token ) return res.status(401).send({ message: "Access denied. No token provided" }); 
     
        try {
            const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

            const user = await userService.findByUuid( uid );
            if ( !user ) return res.status(404).send({ message: 'Token invalid - no user exists' }) 
            
            req.user = user;
        } catch (error) {
            return res.status(400).send({ message: 'Invalid token' })
        };

        next();
    };

    async checkRoleAdmin( req, res, next ){ 
        const roleId = req.user.roleId;
    
        if( roleId !== 1 ) return res.status(403).send({ message: 'Access restriced' }); 
        next();
    };

    async checkRoleUser( req, res, next ){ 
        const roleId = req.user.roleId;
    
        if( roleId !== 2 ) return res.status(403).send({ message: 'Access restriced' }); 
        next();
    };

    async checkRoleEmployee( req, res, next ){ 
        const roleId = req.user.roleId;
    
        if( roleId !== 3 ) return res.status(403).send({ message: 'Access restriced' }); 
        next();
    };
    
};

module.exports = new Middlewares();

