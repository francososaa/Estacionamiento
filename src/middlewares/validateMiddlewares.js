const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");

const validarJWT = async ( req, res, next ) => { 
    const token = req.header("authentication");
    
    if( !token ) return res.status(401).send({ message: "Access denied. No token provided" }); 
    
    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        const user = await userService.findByUuid( uid );
        if ( !user ) return res.status(404).send({ message: "Token invalid - no user exists" }) 
        
        req.user = user;
    } catch (error) {
        return res.status(400).send({ message: "Invalid token" })
    };

    next();
};

const checkRoleAdmin = async ( req, res, next ) => { 
    const roleId = req.user.roleId;

    if( roleId !== 1 ) return res.status(403).send({ message: "Access restriced" }); 
    next();
};

const checkRoleUser = async ( req, res, next ) => { 
    const roleId = req.user.roleId;
    const userIdMiddleware = req.user.userId;
    const userIdParams = req.params.userId;

    if( roleId !== 2 ) return res.status(403).send({ message: "Access restriced" }); 

    if( userIdParams != userIdMiddleware ) return res.status(403).send({ message: "El userId incorrecto" }); 
    next();
};

const checkRoleEmployee = async ( req, res, next ) =>  { 
    const roleId = req.user.roleId;

    if( roleId !== 3 ) return res.status(403).send({ message: "Access restriced" }); 
    next();
};
    


module.exports = {
    checkRoleAdmin,
    checkRoleEmployee,
    checkRoleUser,
    validarJWT
}

