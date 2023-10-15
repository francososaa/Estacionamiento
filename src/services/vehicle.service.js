const vehicleRepository = require('../repository/vehicle.repository');
const reservationService = require('../services/reservation.service');


class ServiceVehicle {
    
    constructor() {};

    async allVehicles(userId){
        return await vehicleRepository.findAll(userId);
    };
    
    async create(dataVehicle){
        return await vehicleRepository.create(dataVehicle);
    };

    async findVehicleByLicense(license){
        return await vehicleRepository.findByLicense(license);
    };

    async findVehicleById(vehicleId, userId){
        const vehicle = await vehicleRepository.findById(vehicleId, userId);

        if(vehicle.isActive === false ) return null;
        return vehicle;
    };

    async updateById(data, vehicleId){
        return await vehicleRepository.updateById(data, vehicleId);
    };

    async cancelVehicle(vehicle){
        try {
            await vehicleRepository.changeStatus(vehicle.vehicleId);
            const reservations = await reservationService.findAllReservationForVehicle(vehicle.vehicleId);
            await reservationService.cancelAllReservationsByVehicle(reservations, vehicle);
         
        } catch (error) {
            return error;
        };
    };

};


module.exports = new ServiceVehicle();
