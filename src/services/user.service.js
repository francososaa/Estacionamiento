const userRepository = require('../repository/user.repository');

class userService {
    
    constructor() {};
    
    async create(user){
        return await userRepository.create(user);
    };

    async findOne(email){
        return await userRepository.findOne(email);
    };

    async findByPk(userId){
        return await userRepository.findByPk(userId);
    };
};


module.exports = new userService();
