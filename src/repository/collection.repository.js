const { db } = require('../models');
const VehicleType = db.vehicle_type;
const Collection = db.collection;
class CollectionRepository {

    constructor() {};
    
    async getAll(){
        return Collection.findAll({ 
            attributes: ["date","moneyGenerated"],
            include: [{ model: VehicleType, as:"vehicleType", attributes: ["description"]}]
        });
    };

    async getAllCollectionByDate(date){
        return await Collection.findAll({ 
            where: { date: date },
            attributes: ["date","moneyGenerated"],
            include: [{ model: VehicleType, as:"vehicleType", attributes: ["description"]}] 
        });
    };

    async destoy(id){
        await Collection.destroy({ where: { vehicleTypeId: id }})
    };
};

module.exports = new CollectionRepository();
