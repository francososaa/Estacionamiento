const bcryptjs = require('bcryptjs');
const generarJWT  = require('../helpers/generar-jwt');
const mailService = require('../services/email-service');
const User = require('../models/user.model');

const login = async ( req, res ) => {

    const { email, password } = req.body;

    if ( !email | !password ) return res.status(400).send({ error: 'Email and password are mandatory' })
    
    try {
        const user = await User.findOne( { 
            where: { 
                email : email,
                status: true 
            } 
        } );
        
        if( !user ) return res.status(400).send({ message: 'User does not exist' });

        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) return res.status(400).send({ message: 'Password is incorrect' });

        const token = await generarJWT( user.id );
        return res.send({ 
            message: 'Successfully logged in',
            user,
            token 
        });

    } catch (error){ 
        return res.status(500).send({ message: error.message });
    }
};

const authRegister = async (req, res) => {
    const { name, email, password } = req.body;

    if ( !name | !email | !password ) return res.status(400).json({ error: 'Name, email and password are mandatory' });
    
    try {
        const user = await User.create({
            name,
            email,
            password
        });

        await user.save();
        
        let mail = new mailService(user.email, user.name);
        mail.sendMail().catch();

        const token = await generarJWT(user.id);

        return res.status(201).send({
            message: 'Successfully Registered',
            user,
            token
        });

    } catch (error) {
        return res.status(500).send({ error: error.message});
    }
}

module.exports = {
    authRegister,
    login
};
