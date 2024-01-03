const { db } = require('../models');
const buildingCapacityRepository = require('../repository/building_capacity.repository');

class BuildingCapacityService {
    
    constructor() {};
    
    async create(dataCapacity){
        return await buildingCapacityRepository.create(dataCapacity);
    };

    async getAll(){
        return await buildingCapacityRepository.findAll();
    };

    async isCompleteOverallCapacity(date, vehicleTypeId){
        const buildingCapacity = await buildingCapacityRepository.findByDateAndVehicleType(date, vehicleTypeId);
        return buildingCapacity.isCompleteOverallCapacity;
    };

    async updateOverallCapacityForDateAndTypeVehicle(date, vehicleTypeId, overallCapacity){
       return await buildingCapacityRepository.updateCapacityForDateAndVehicleType(date, vehicleTypeId, overallCapacity);
    };  

    async updateCapacity(date, vehicleTypeId){
        const buildingCapacity = await this.increaseCapacity(date, vehicleTypeId);
        await buildingCapacity.save();
        return buildingCapacity;
    };

    async validaDateAndType(date, vehicleTypeId){
        return await buildingCapacityRepository.findByDateAndVehicleType(date, vehicleTypeId);
    };

    async decreaseCapacity(date, vehicleTypeId ){        
        let buildingCapacity = await buildingCapacityRepository.findByDateAndVehicleType(date, vehicleTypeId);

        buildingCapacity.overallCapacityOccupied -= 1;
        buildingCapacity.totalVehicles -= 1;
        
        if(buildingCapacity.isCompleteOverallCapacity) buildingCapacity.isCompleteOverallCapacity = false;
        await buildingCapacity.save();
        return buildingCapacity;
    };

    async increaseCapacity(date, vehicleTypeId){
        let buildingCapacity = await buildingCapacityRepository.findByDateAndVehicleType(date, vehicleTypeId);

        buildingCapacity.overallCapacityOccupied += 1;
        buildingCapacity.totalVehicles += 1;

        if(buildingCapacity.overallCapacity === buildingCapacity.overallCapacityOccupied) buildingCapacity.isCompleteOverallCapacity = true;
        return buildingCapacity;
    };

   async destroyForDateAndVehicleType(date, vehicleTypeId){
        return await buildingCapacityRepository.destroyForDateAndVehicleType(date, vehicleTypeId);
    };
};


module.exports = new BuildingCapacityService();
