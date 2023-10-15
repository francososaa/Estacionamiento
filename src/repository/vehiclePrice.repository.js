const { db } = require('../db/dataBase');

class VehiclePriceRepository {

    constructor() {};

    async create(vehicle_price){
        await db.vehicle_price.create(vehicle_price);
    };

    async getAll(){
        return db.vehicle_price.findAll({attributes: ["vehiclePrice","vehicleTypeId"]});
    };

    async update(data){
        await db.vehicle_price.update(data, { where: {vehicleTypeId : data.vehicleTypeId} });
    };

};

module.exports = new VehiclePriceRepository();