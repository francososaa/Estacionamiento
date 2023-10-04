const { db } = require('../db/dataBase');
const repository = require('../repository/building_capacity.repository');


class BuildingCapacityService {
    
    constructor() {};
    
    async create(dataCapacity){
        return await repository.create(dataCapacity);
    };

    async isCompleteOverallCapacity(date, vehicleTypeId){
        const buildingCapacity = await repository.findByDateAndVehicleType(date, vehicleTypeId);

        return buildingCapacity.isCompleteOverallCapacity;
    };

    async updateCapacity(date, vehicleTypeId){

        let buildingCapacity = await repository.findByDateAndVehicleType(date, vehicleTypeId);
        buildingCapacity.overallCapacityOccupied += 1;
        if(buildingCapacity.overallCapacity === buildingCapacity.overallCapacityOccupied) buildingCapacity.isCompleteOverallCapacity = true;

        const transaction = await db.sequelize.transaction();
        try {
            buildingCapacity = await buildingCapacity.save({ transaction });

            if( buildingCapacity.overallCapacity < buildingCapacity.overallCapacityOccupied ){
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
        return await repository.findByDateAndVehicleType(dataCapacity.date, dataCapacity.vehicleTypeId);
    };

    async decreaseCapacity(date, vehicleTypeId ){        
        const buildingCapacity = await repository.findByDateAndVehicleType(date, vehicleTypeId);

        buildingCapacity.overallCapacityOccupied -= 1;
        if(buildingCapacity.isCompleteOverallCapacity) buildingCapacity.isCompleteOverallCapacity = false;
        await buildingCapacity.save();
    };

    async increaseCapacity(){
        const buildingCapacity = await repository.findByDateAndVehicleType(date, vehicleTypeId);

        buildingCapacity.overallCapacityOccupied += 1;
        if(buildingCapacity.overallCapacity === buildingCapacity.overallCapacityOccupied) buildingCapacity.isCompleteOverallCapacity = true;
        await buildingCapacity.save();
    };

   

};


module.exports = new BuildingCapacityService();
