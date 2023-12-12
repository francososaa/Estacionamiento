const vehicleRepository = require('../repository/vehicle.repository');
const reservationService = require('../services/reservation.service');
class VehicleService {
    
    constructor() {};

    async allVehiclesAdmin(){
        return await vehicleRepository.findAll();
    };
    
    async allVehicles(userId){
        return await vehicleRepository.findAllForUser(userId);
    };

    async create(dataVehicle){
        return await vehicleRepository.create(dataVehicle);
    };

    async findVehicleByLicense(license, userId){
        return await vehicleRepository.findByLicense(license, userId);
    };

    async findVehicleById(id){
        const vehicle = await vehicleRepository.findById(id);

        if(vehicle.isActive === false ) return null;
        return vehicle;
    };

    async updateById(data, vehicleId){
        return await vehicleRepository.updateById(data, vehicleId);
    };

    async cancelVehicle(vehicle){
        await vehicleRepository.changeStatus(vehicle.vehicleId);
        const reservations = await reservationService.findAllReservationForVehicle(vehicle.vehicleId);
        if(reservations.length !== 0) await reservationService.cancelAllReservationsByVehicle(reservations, vehicle);
    };
};


module.exports = new VehicleService();
