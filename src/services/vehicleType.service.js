const vehicleTypeRepository = require('../repository/vehicleType.repository');
class VehicleTypeService{
    constructor() {};

    async getAll(){
        return await vehicleTypeRepository.findAll();
    };

    async create(data){
        return await vehicleTypeRepository.create(data);
    };

    async findVehicleType(description){
        return await vehicleTypeRepository.findOne(description);
    }

    async findById(id){
        return await vehicleTypeRepository.findByVehicleId(id);
    };

    async update(data, id){
        return await vehicleTypeRepository.update(data, id);
    };

    async deleteTypeVehicle(id){
        return await vehicleTypeRepository.destroy(id); 
    };
};

module.exports = new VehicleTypeService();
