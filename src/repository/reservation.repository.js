const { db } = require('../models');
const { Op } = require('sequelize');
const Reservation = db.reservation;
const User = db.user;
const Vehicle = db.vehicle;
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

    async findAllByDate(date){
        return await Reservation.findAll({ 
            where: { date: date },  
            attributes: { exclude: ["createdAt","updatedAt","userId", "vehicleId"] },
            include: [
                { model: User, as:"user", attributes: ["firstname","lastname"] },
                { model: Vehicle, as:"vehicle", attributes: ["license"] }
            ]   
        });
    };

    async deleteReservationForDateAndVehicleId(date, id){
        return await Reservation.destroy({ where: {[Op.and]: [{ date: date }, { vehicleId: id }]} });
    };

    async updateReservationVehicleId(data, date, userId){
        return await Reservation.update( data ,{ where: {[Op.and]: [{ date: date }, { userId: userId }]} });
    };

    async updateReservationState(date, state, userId){
        return await Reservation.update(
            { state: state },
            { where: { [Op.and]:[{ date: date }, { userId: userId }]}}
        );
    };
};

module.exports = new ReservationRepository();
