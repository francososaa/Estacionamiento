const { db } = require('../models');
const { Op } = require('sequelize');
const Vehicle = db.vehicle;
const User = db.user;
const VehicleType = db.vehicle_type;
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
                { model: User, as:"user", attributes: ["firstname","lastname"] },
                { model: VehicleType, as:"vehicleType", attributes: ["description"]}
            ]
        });
    };

    async findById(vehicleId){
        return await Vehicle.findByPk(vehicleId);
    };

    async findAll(){
        return await Vehicle.findAll({
            where: { [Op.and]: [{ isActive: true }] },
            attributes: ["vehicleId","license","model"],
            include: [
                { model: User, as:"user", attributes: ["firstname","lastname"] },
                { model: VehicleType, as:"vehicleType", attributes: ["description"]}
            ]
        });
    };

    async updateById(data, id){
        await Vehicle.update(data, { where: { vehicleId: id }});
    };

    async changeStatus(id){
        return await Vehicle.update(
            { isActive: false },
            { where: { vehicleId: id } }
        );
    };

};

module.exports = new VehicleRepository();
