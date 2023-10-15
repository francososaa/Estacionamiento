const vehiclePriceRepository = require('../repository/vehiclePrice.repository');

class ServiceVehiclePrice {

    constructor() {};

    async create(vehicle_price){
        await vehiclePriceRepository.create(vehicle_price);
    };

    async getAll(){
        return await vehiclePriceRepository.getAll();
    };

    async update(data){
        await vehiclePriceRepository.update(data);
    };

};

module.exports = new ServiceVehiclePrice();
