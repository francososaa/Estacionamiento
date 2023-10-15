const { Op } = require('sequelize');
const { db } = require('../db/dataBase');


class VehicleRepository {
    
    constructor() {};
    
    async create(dataVehicle){
        return await db.vehicle.create(dataVehicle);
    };

    async findByLicense(license){
        return await db.vehicle.findOne({
            where: { isActive: true , license: license },
            attributes: ["vehicleId","license","model"] ,
            include: [
                { model: db.user, as:"user", attributes: ["firstname","lastname"] },
                { model: db.vehicle_type, as:"vehicleType", attributes: ["description"]}
            ]
        });
    };

    async findById(vehicleId, userId){
        return await db.vehicle.findByPk(vehicleId, { where: { userId: userId} });
    };

    async findAll(userId){
        return await db.vehicle.findAll({
            where: { isActive: true, userId: userId },
            attributes: ["vehicleId","license","model"],
            include: [
                { model: db.user, as:"user", attributes: ["firstname","lastname"] },
                { model: db.vehicle_type, as:"vehicleType", attributes: ["description"]}
            ]
        });
    };

    async updateById(data, id){
        return await db.vehicle.update(data, { where: { vehicleId: id }});
    };

    async changeStatus(vehicleId){
        return await db.vehicle.update(
            { isActive: false },
            { where: { vehicleId: vehicleId } }
        );
    };



};

module.exports = new VehicleRepository();
