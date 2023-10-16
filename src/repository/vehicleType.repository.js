const { db } = require('../models');
const VehicleType = db.vehicle_type;
class VehicleTypeRepository{
    constructor(){};

    async findAll(){
        return await VehicleType.findAll({ attributes: ["vehicleTypeId","description"]});
    };

    async create(data){
        return await VehicleType.create(data);
    };

    async findOne(description){
        return await VehicleType.findOne({
            where: { description: description }
        });
    };

    async findByVehicleId(id){
        return await VehicleType.findByPk(id);
    };

    async update(data){
        await VehicleType.update(data);
    };

    async destroy(id){
        await VehicleType.destroy({ where: { vehicleTypeId :id } });
    };

}

module.exports = new VehicleTypeRepository();
