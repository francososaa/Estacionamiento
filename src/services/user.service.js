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

    async findByUuid(uid){
        return await userRepository.findByUuid(uid);
    }
};


module.exports = new userService();
