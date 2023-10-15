const { Op } = require('sequelize');
const { db } = require('../models');

class BuildingCapacityRepository {
    
    constructor() {};
    
    async create(dataCapacity){
        return await db.building_capacity.create(dataCapacity);
    };

    async findAll(){
        return await db.building_capacity.findAll({ 
            attributes: { exclude: ["isCompleteOverallCapacity"] }, 
            include: [{ model: db.vehicle_type, as:"vehicleType", attributes: ["description"]}]
        });
    };

    async findByDateAndVehicleType(date, vehicleTypeId){
        return await db.building_capacity.findOne({
            where: { 
                [Op.and]: [{ date: date }, { vehicleTypeId: vehicleTypeId }]
            }
        });
    };

    async updateCapacityForDateAndVehicleType(date, vehicleTypeId, overallCapacity){
        await db.building_capacity.update(
            { overallCapacity: overallCapacity },
            { where: {[Op.and]: [{ date: date }, { vehicleTypeId: vehicleTypeId }]} }
        );
    };

    async destroyForDateAndVehicleType(date, vehicleTypeId){
        await db.building_capacity.destroy(
            { where: {[Op.and]: [{ date: date }, { vehicleTypeId: vehicleTypeId }]} }
        );
    };

};

module.exports = new BuildingCapacityRepository();
