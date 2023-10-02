const { Op } = require('sequelize');
const { db } = require('../db/dataBase');


class RepositoryReservation {
    
    constructor() {};
    
    async create(dataReservation){
        return await db.reservation.create(dataReservation);
    };

    async findByDateAndUserId(date, userId){
        return await db.reservation.findOne({
            where: {
                [Op.and]: [
                    { date: date },
                    { userId: userId}
                ]
            }
        });
    };

    async findAllRerservationByPk(vehicleId){
        return await db.reservation.findByPk(vehicleId);
    };

    async deleteReservation(transaction, reservationId){
        return await db.reservation.destroy( { where: { reservationId: reservationId } , transaction: transaction } );
    };

    async updateReservationState(state, transaction, reservationId){
        return await db.reservation.update(
            { state: state },
            { where: { reservationId: reservationId } , transaction }
        );
    };


};

module.exports = new RepositoryReservation();
