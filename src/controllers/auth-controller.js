const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generarJWT = require('../helpers/generar-jwt');
const { db } = require('../models');
const User = db.user;

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email | !password) return res.status(400).send({ error: 'Email and password are mandatory' })

    try {
        const user = await User.findOne({
            where: {
                email: email,
                isActive: true
            }
        });

        if (!user) return res.status(400).send({ message: 'User does not exist' });

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) return res.status(400).send({ message: 'Password is incorrect' });

        const token = await generarJWT( user.userId );

        return res.send({
            message: 'Successfully logged in',
            user,
            token
        });

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

const logout = async (req, res) => {
    
    const authHeader = req.headers["authentication"];
    if (!authHeader) return res.status(204).send();
    
    jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
        if (logout) return res.status(200).send({ message: 'You have successfully logged out' });

        return res.status(400).send({ message: 'Error in logout' });
    });
};

const authRegister = async (req, res) => {
    const userData = req.body;

    if (!userData) return res.status(400).json({ error: 'All data is required' });

    try {
        const user = await User.create(userData);

        await user.save();

        return res.status(201).send({
            message: 'Successfully Registered',
            user
        });

    } catch (error) {
        return res.status(500).send({ error: error.message });
    };
};

module.exports = {
    authRegister,
    login,
    logout
};
