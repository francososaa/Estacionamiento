const { db } = require('../db/dataBase');


class VehicleTypeRepository{
    constructor(){};

    async findAll(){
        return await db.vehicle_type.findAll({ attributes: ["vehicleTypeId","description"]});
    };

    async create(description){
        return await db.vehicle_type.create(description);
    };

    async findOne(description){
        return await db.vehicle_type.findOne({
            where: { description: description }
        })
    };

    async findByVehicleId(id){
        return await db.vehicle_type.findByPk(id);
    };


}

module.exports = new VehicleTypeRepository();
