const { db } = require('../db/dataBase');


class VehicleTypeRepository{
    constructor(){};

    async findAll(){
        return await db.vehicle_type.findAll({ attributes: ["vehicleTypeId","description"]});
    };

    async create(data){
        return await db.vehicle_type.create(data);
    };

    async findOne(data){
        return await db.vehicle_type.findOne({
            where: { description: data }
        })
    }
}

module.exports = new VehicleTypeRepository();
