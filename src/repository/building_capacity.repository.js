const { db } = require('../models');
const { Op } = require('sequelize');
const BuildingCapacity = db.building_capacity;
const VehicleType = db.vehicle_type;
class BuildingCapacityRepository {
    
    constructor() {};
    
    async create(dataCapacity){
        return await BuildingCapacity.create(dataCapacity);
    };

    async findAll(){
        return await BuildingCapacity.findAll({ 
            attributes: { exclude: ["isCompleteOverallCapacity","createdAt","updatedAt","vehicleTypeId"] }, 
            include: [{ model: VehicleType, as:"vehicleType", attributes: ["description"]}]
        });
    };

    async findByDateAndVehicleType(date, id){
        return await BuildingCapacity.findOne({
            where: {[Op.and]: [{ date: date }, { vehicleTypeId: id }]}
        });
    };

    async updateCapacityForDateAndVehicleType(date, id, overallCapacity){
        await BuildingCapacity.update(
            { overallCapacity: overallCapacity },
            { where: {[Op.and]: [{ date: date }, { vehicleTypeId: id }]} }
        );
    };

    async destroyForDateAndVehicleType(date, id){
        await BuildingCapacity.destroy(
            { where: {[Op.and]: [{ date: date }, { vehicleTypeId: id }]} }
        );
    };

};

module.exports = new BuildingCapacityRepository();
