const { Op } = require('sequelize');
const { db } = require('../db/dataBase');


class BuildingCapacityRepository {
    
    constructor() {};
    
    async create(dataCapacity){
        return await db.building_capacity.create(dataCapacity);
    };

    async findByDateAndVehicleType(date, vehicleTypeId){
        return await db.building_capacity.findOne({
            where: { 
                [Op.and]: [{ date: date }, { vehicleTypeId: vehicleTypeId }]
            }
        });
    }

};

module.exports = new BuildingCapacityRepository();
