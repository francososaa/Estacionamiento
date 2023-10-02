const { Op } = require('sequelize');
const { db } = require('../db/dataBase');


class RepositoryBuildingCapacity {
    
    constructor() {};
    
    async create(dataCapacity){
        return await db.building_capacity.create(dataCapacity);
    };

    async findByDateAndvehicleType(date, vehicleTypeId){
        return await db.building_capacity.findOne({
            where: { 
                [Op.and]: [{ date : date }, { vehicleTypeId: vehicleTypeId }]
            }
        });
    }

};

module.exports = new RepositoryBuildingCapacity();
