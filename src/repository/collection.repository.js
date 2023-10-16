const { db } = require('../models');
class CollectionRepository {

    constructor() {};
    
    async getAll(){
        return db.collection.findAll({ 
            attributes: ["date","moneyGenerated"],
            include: [{ model: db.vehicle_type, as:"vehicleType", attributes: ["description"]}]
        });
    };

    async getCollectionByDate(date){
        return await db.collection.findAll({ 
            where: { date: date },
            attributes: ["date","moneyGenerated"],
            include: [{ model: db.vehicle_type, as:"vehicleType", attributes: ["description"]}] 
        });
    };

};

module.exports = new CollectionRepository();
