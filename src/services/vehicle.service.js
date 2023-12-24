const vehicleRepository = require('../repository/vehicle.repository');
const reservationService = require('../services/reservation.service');
class VehicleService {
    
    constructor() {};
    
    async allVehicles(userId){
        return await vehicleRepository.findAllForUser(userId);
    };

    async create(dataVehicle){
        return await vehicleRepository.create(dataVehicle);
    };

    async findVehicleByLicense(license, userId){
        return await vehicleRepository.findByLicense(license, userId);
    };

    async findVehicleById(vehicleId){
        return await vehicleRepository.findById(vehicleId);
    };

    async updateById(data, vehicleId){
        return await vehicleRepository.updateById(data, vehicleId);
    };

    async cancelVehicle(vehicle){
        await vehicleRepository.changeStatus(vehicle.vehicleId);
        const reservations = await reservationService.findAllReservationForVehicle(vehicle.vehicleId);
        if(reservations.length !== 0) await reservationService.cancelAllReservationsByVehicle(reservations, vehicle);

        return true;
    };
};


module.exports = new VehicleService();
