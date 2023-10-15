const { db } = require('../db/dataBase');


class VehicleTypeRepository{
    constructor(){};

    async findAll(){
        return await db.vehicle_type.findAll({ attributes: ["vehicleTypeId","description"]});
    };

    async create(data){
        return await db.vehicle_type.create(data);
    };

    async findOne(description){
        return await db.vehicle_type.findOne({
            where: { description: description }
        })
    };

    async findByVehicleId(id){
        return await db.vehicle_type.findByPk(id);
    };

    async update(data){
        await db.vehicle_type.update(data);
    };

    async destroy(id){
        await db.vehicle_type.destroy({ where: { vehicleTypeId :id } });
    };


}

module.exports = new VehicleTypeRepository();
