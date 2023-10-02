const repository = require('../repository/vehicle.repository');
const { db } = require('../db/dataBase');
const vehicleRepository = require('../repository/vehicle.repository');
const reservationService = require('../services/reservation.service');


class ServiceVehicle {
    
    constructor() {};

    async allVehicles(){
        return await repository.findAll();
    };
    
    async create(dataVehicle){
        return await repository.create(dataVehicle);
    };

    async findVehicleByLicense(license){
        return await repository.findByLicense(license);
    };

    async findVehicleById(vehicleId){
        return await repository.findById(vehicleId);
    };

    async updateById(data, vehicleId){
        try {
            return await db.sequelize.transaction( async (transaction) => {
                try {
                    await repository.updateById(data, vehicleId, transaction);
                    return 0;
                } catch (err) {
                    transaction.rollback();
                    return -1;
                }
            });
        } catch (error) {
            return -1;
        };
    };

    async cancelVehicle(vehicleId){
        try {
            return await db.sequelize.transaction( async (transaction) => {
                try {
                    const vehicle = await vehicleRepository.changeStatus(vehicleId, transaction);
                    if( !vehicle ) return -1;

                    const reservations = await reservationService.findAllReservationForVehicle(vehicle);
                    return await reservationService.cancelAllReservationsByVehicle(transaction, reservations);
                } catch (err) {
                    transaction.rollback();
                    return -1;
                }
            });
        } catch (error) {
            return -1;
        };
    };

};


module.exports = new ServiceVehicle();
