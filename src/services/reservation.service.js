const { formatDate } = require('../utils/dateUtil');
const reservationRepository = require('../repository/reservation.repository');
const buildingCapacityService = require('./building_capacity.service');
const vehicleRepository = require('../repository/vehicle.repository');

class ReservationService {
    
    constructor() {};
    
    async create(dataReservation){
        return await reservationRepository.create(dataReservation);
    };

    async getAllReservationForUser(userId){
        return await reservationRepository.getAll(userId);
    };

    async getAll(){
        return await reservationRepository.getAllAdmin();
    };

    async getAllReservationsByDate(date){
        return await reservationRepository.findAllByDate(date);
    };
    
    async cancelAllReservationsByVehicle(reservations, vehicle){
        const date = formatDate(new Date());
        
        for (const reservation of reservations) {
            if( date <= reservation.date ) {
                await reservationRepository.deleteReservationForDateAndVehicleId(reservation.date, reservation.vehicleId);
                await buildingCapacityService.decreaseCapacity(reservation.date, vehicle.vehicleTypeId);
            };
        };
    };

    async findAllReservationForVehicle(vehicleId){
        return await reservationRepository.findAllRerservationByPk(vehicleId);
    };

    async findReservationByDate(date, userId){
        return await reservationRepository.findByDateAndUserId(date, userId)
    };

    async deleteReservation(reservation){
        const vehicle = await vehicleRepository.findById(reservation.vehicleId);
        await reservationRepository.deleteReservationForDateAndVehicleId(reservation.date, reservation.vehicleId);
        await buildingCapacityService.decreaseCapacity(reservation.date, vehicle.vehicleTypeId);
    };

    async update(data, reservation){
        await reservationRepository.updateReservationVehicleId(data, reservation.date, reservation.userId);
    };

    async updateState(date, state, userId){
        await reservationRepository.updateReservationState(date, state, userId);
    };

};


module.exports = new ReservationService();
