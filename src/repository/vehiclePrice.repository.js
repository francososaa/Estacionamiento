const { db } = require('../models');
const VehiclePrice = db.vehicle_price;
class VehiclePriceRepository {

    constructor() {};

    async create(vehicle_price){
        return await VehiclePrice.create(vehicle_price);
    };

    async getAll(){
        return VehiclePrice.findAll({ attributes: ["vehiclePrice","vehicleTypeId"] });
    };

    async update(data){
        return await VehiclePrice.update(data, { where: {vehicleTypeId: data.vehicleTypeId} });
    };

    async findByPk(id){
        return await VehiclePrice.findOne({ where: {vehicleTypeId: id} });
    };
};

module.exports = new VehiclePriceRepository();