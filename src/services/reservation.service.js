const repository = require('../repository/reservation.repository');

class ReservationService {
    
    constructor() {};
    
    async create (dataReservation){
        return await repository.create(dataReservation);
    };
    
    async cancelAllReservationsByVehicle(transaction, reservations){

        
        // return await repository.deleteReservation(transaction, reservations);
    };

    async findAllReservationForVehicle(vehicle){
        return await repository.findAllRerservationByPk(vehicle.vehicleId);
        
    };


};


module.exports = new ReservationService();
