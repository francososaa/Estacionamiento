const { Op } = require('sequelize');
const { db } = require('../db/dataBase');


class ReservationRepository {
    
    constructor() {};
    
    async create(dataReservation){
        return await db.reservation.create(dataReservation);
    };

    async findByDateAndUserId(date, userId){
        return await db.reservation.findOne({
            where: {
                [Op.and]: [ { date: date }, { userId: userId} ]
            }
        });
    };

    async findAllRerservationByPk(vehicleId){
        return await db.reservation.findAll({ where: { vehicleId: vehicleId }});
    };

    async deleteReservation(date, vehicleId){
        return await db.reservation.destroy({ where: {[Op.and]: [{ date: date }, { vehicleId: vehicleId }]} });
    };

    async updateReservationState(state, transaction, reservationId){
        return await db.reservation.update(
            { state: state },
            { where: { reservationId: reservationId } , transaction }
        );
    };


};

module.exports = new ReservationRepository();
