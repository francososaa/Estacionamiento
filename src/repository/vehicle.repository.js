const { db } = require('../models');
const { Op } = db.sequelize
const Vehicle = db.vehicle;
// const { Op } = require('sequelize');
class VehicleRepository {
    
    constructor() {};
    
    async create(dataVehicle){
        return await Vehicle.create(dataVehicle);
    };

    async findByLicense(license){
        return await Vehicle.findOne({
            where: { [Op.and]: [{ isActive: true }, { license: license}] },
            attributes: ["vehicleId","license","model"] ,
            include: [
                { model: db.user, as:"user", attributes: ["firstname","lastname"] },
                { model: Vehicle_type, as:"vehicleType", attributes: ["description"]}
            ]
        });
    };

    async findById(vehicleId, userId){
        return await Vehicle.findByPk(vehicleId, { where: { userId: userId} });
    };

    async findAll(userId){
        return await Vehicle.findAll({
            where: { [Op.and]: [{ isActive: true }, { userId: userId}] },
            attributes: ["vehicleId","license","model"],
            include: [
                { model: db.user, as:"user", attributes: ["firstname","lastname"] },
                { model: Vehicle_type, as:"vehicleType", attributes: ["description"]}
            ]
        });
    };

    async updateById(data, id){
        return await Vehicle.update(data, { where: { vehicleId: id }});
    };

    async changeStatus(vehicleId){
        return await Vehicle.update(
            { isActive: false },
            { where: { vehicleId: vehicleId } }
        );
    };

};

module.exports = new VehicleRepository();
