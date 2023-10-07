const vehicleTypeRepository = require('../repository/vehicleType.repository');

class VehicleTypeRepository{
    constructor() {};

    async getAll(){
        return await vehicleTypeRepository.findAll();
    };

    async create(data){
        return await vehicleTypeRepository.create(data);
    };

    async findVehicleType(data){
        return await vehicleTypeRepository.findOne(data);
    }
};

module.exports = new VehicleTypeRepository();
