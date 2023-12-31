const vehiclePriceRepository = require('../repository/vehiclePrice.repository');

class ServiceVehiclePrice {

    constructor() {};

    async create(vehicle_price){
        return await vehiclePriceRepository.create(vehicle_price);
    };

    async getAll(){
        return await vehiclePriceRepository.getAll();
    };

    async update(data){
        return await vehiclePriceRepository.update(data);
    };

    async findByVehicleType(vehicleTypeId){
        return await vehiclePriceRepository.findByPk(vehicleTypeId);
    };
};

module.exports = new ServiceVehiclePrice();
