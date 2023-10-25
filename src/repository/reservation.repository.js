const { db } = require('../models');
const { Op } = require('sequelize');
const Reservation = db.reservation;
class ReservationRepository {
    
    constructor() {};

    async getAll(userId){
        return await Reservation.findAll({ where: { userId: userId }, order: [["date", "ASC"]] });
    };

    async getAllAdmin(){
        return await Reservation.findAll({ order: [["date", "ASC"]] });
    };

    async create(dataReservation){
        return await Reservation.create(dataReservation);
    };

    async findByDateAndUserId(date, userId){
        return await Reservation.findOne({ where: {[Op.and]: [{ date: date },{ userId: userId}]} });
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

    async updateReservationVehicleId(data, date, userId){
        await Reservation.update( data ,{ where: {[Op.and]: [{ date: date }, { userId: userId }]} });
    };

};

module.exports = new ReservationRepository();
