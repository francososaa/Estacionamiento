const {formatDate} = require('../utils/dateUtil');
const reservationRepository = require('../repository/reservation.repository');
const buildingCapacityService = require('./building_capacity.service');


class ReservationService {
    
    constructor() {};
    
    async create (dataReservation){
        return await reservationRepository.create(dataReservation);
    };
    
    async cancelAllReservationsByVehicle(reservations, vehicle){
        const date = formatDate(new Date());
        
        for (const reservation of reservations) {
            if( date <= reservation.date ) {
                await reservationRepository.deleteReservation(reservation.date, reservation.vehicleId);
                await buildingCapacityService.decreaseCapacity(reservation.date, vehicle.vehicleTypeId);
            }
        };
    };

    async findAllReservationForVehicle(vehicleId){
        return await reservationRepository.findAllRerservationByPk(vehicleId);
    };


};


module.exports = new ReservationService();
