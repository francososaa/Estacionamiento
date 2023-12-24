const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generarJWT } = require('../helpers/generar-jwt');
const  { sendRegistrationEmail } = require('../services/email.service');
const userService = require("../services/user.service");

const login = async (req, res) => {
    const { email, password } = req.body;

    if ( !email | !password ) return res.status(400).send({ message: "Email and password are mandatory" })

    try {
        const user = await userService.findOne(email)

        if ( !user ) return res.status(404).send({ message: "User does not exist" });

        const validPassword = bcryptjs.compareSync(password, user.password);
        if ( !validPassword ) return res.status(400).send({ message: "Password is incorrect" });

        const token = await generarJWT( user.userId );

        return res.send({
            message: "Successfully logged in",
            user,
            token
        });

    } catch (error) {
        return res.status(500).send({ message: "Error al iniciar sesion" });
    }
};

const logout = async (req, res) => {
    const authHeader = req.headers["authentication"];
    if ( !authHeader ) return res.status(204).send({ message: "No se envio el token" });
    
    jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
        if ( logout ) return res.send({ message: "You have successfully logged out" });

        return res.status(400).send({ message: "Error in logout" });
    });
};

const authRegister = async (req, res) => {
    const userData = req.body;

    if ( !userData.firstname || !userData.lastname || !userData.email || !userData.password || !userData.dni || !userData.roleId  ) return res.status(400).send({ message: "All data is required" });

    try {
        const user = await userService.create(userData);

        await sendRegistrationEmail(user.email, user.firstname);

        return res.status(201).send({ message: "Successfully Registered" });

    } catch (error) {
        return res.status(500).send({ message: "Fallo la registracion" });
    };
};

module.exports = {
    authRegister,
    login,
    logout
};
