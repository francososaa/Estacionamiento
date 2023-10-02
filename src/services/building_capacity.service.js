const { db } = require('../db/dataBase');
const repository = require('../repository/building_capacity.repository');


class BuildingCapacityService {
    
    constructor() {};
    
    async create(dataCapacity){
        return await repository.create(dataCapacity);
    };

    async isCompleteOverallCapacity(date, vehicleTypeId){
        return repository.findByDateAndvehicleType(date, vehicleTypeId) ? true : false
    };

    async updateCapacity(date, vehicleTypeId){

        let buildingCapacity = await repository.findByDateAndvehicleType(date, vehicleTypeId);

        // Valido que haya lugar disponible
        if( buildingCapacity.overallCapacity <= buildingCapacity.overallCapacityOccupied ) {
            buildingCapacity.isCompleteOverallCapacity = true;
            await buildingCapacity.save();
            return null;
        }
        
        buildingCapacity.overallCapacityOccupied += 1;
        
        const transaction = await db.sequelize.transaction();
        
        try {
            buildingCapacity = await buildingCapacity.save({ transaction });

            if( buildingCapacity.isCompleteOverallCapacity ){
                await transaction.rollback();
                return null;
            };

            await transaction.commit();
            return buildingCapacity;

        } catch (err) {
            await transaction.rollback();
            return null;
        }

    };

    async validaDateAndType(dataCapacity){
        return await repository.findByDateAndvehicleType(dataCapacity.date, dataCapacity.vehicleTypeId);
    };

   

};


module.exports = new BuildingCapacityService();
