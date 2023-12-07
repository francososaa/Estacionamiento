const { db } = require('../models');
const User = db.user;

class userRepository {
    
    constructor() {};
    
    async create(user){
        return await User.create(user);
    };

    async findById(userId){
        return await User.findByPk(userId);
    };

    async findOne(email){
        return await User.findOne({
            where: { email: email }
        });
    };

};

module.exports = new userRepository();
