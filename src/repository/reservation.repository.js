const { db } = require('../models');
const { Op } = require('sequelize');
const Reservation = db.reservation;
class ReservationRepository {
    
    constructor() {};
    
    async create(dataReservation){
        return await Reservation.create(dataReservation);
    };

    async findByDateAndUserId(date, userId){
        return await Reservation.findOne({
            where: {
                [Op.and]: [ { date: date }, { userId: userId} ]
            }
        });
    };

    async findAllRerservationByPk(id){
        return await Reservation.findAll({ where: { vehicleId: id }});
    };

    async deleteReservation(date, id){
        return await Reservation.destroy({ where: {[Op.and]: [{ date: date }, { vehicleId: id }]} });
    };

    async updateReservationState(state, transaction, reservationId){
        return await Reservation.update(
            { state: state },
            { where: { reservationId: reservationId } , transaction }
        );
    };

};

module.exports = new ReservationRepository();
