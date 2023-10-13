const vehicleTypeRepository = require('../repository/vehicleType.repository');

class VehicleTypeRepository{
    constructor() {};

    async getAll(){
        return await vehicleTypeRepository.findAll();
    };

    async create(description){
        return await vehicleTypeRepository.create(description);
    };

    async findVehicleType(description){
        return await vehicleTypeRepository.findOne(description);
    }

    async findById(id){
        return await vehicleTypeRepository.findByVehicleId(id);
    };
};

module.exports = new VehicleTypeRepository();
