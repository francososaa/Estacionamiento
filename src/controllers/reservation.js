const logger = require('../utils/logger');
const reservationService = require('../services/reservation.service');
const buildingCapacityService = require('../services/building_capacity.service');
const vehicleService = require('../services/vehicle.service');

const createReservation = async (req,res) => {
    
    let reservation = req.body;

    try{
        const reservationVehicle = await vehicleService.findVehicleById(reservation.vehicleId);
        if( !reservationVehicle ) return res.status(404).send({ message: "Vehiculo inexistente" });
        reservation.vehicle = reservationVehicle;   

        const existReservationForPerson = await validateMoreOneReservationForPerson(reservation.date, reservation.userId);
        if( existReservationForPerson ) return res.status(400).send({ message: "Ya hay una reserva con este usuario para esta fecha" }); 

        const overallCapacity = await buildingCapacityService.isCompleteOverallCapacity(reservation.date, reservation.vehicle.vehicleTypeId);
        if( overallCapacity ) return res.status(400).send({ message: "No hay lugar disponible para la fecha seleccionada." });
        
        await buildingCapacityService.updateCapacity(reservation.date, reservation.vehicle.vehicleTypeId);

        reservation.state = "CREATED";

        const createReservation = await reservationService.create(reservation);
        return res.status(201).send({  message: "Reserva creada correctamente", reservation: createReservation });

    } catch(error){
        logger.error("Error al crear la reserva");
        return res.status(500).send({ message: "Ocurrio un error al crear la reserva" });
    };
};

const getAll = async (req,res) => {
    const reservations = await reservationService.getAll();
    return res.send({ message: "Success", reservations });
};

const getAllReservationForUser = async (req,res) => {
    const userId = req.params.userId;
    
    const reservation = await reservationService.getAllReservationForUser(userId);
    return res.send({ message: "Success", reservation });
};

const destoy = async (req,res) => {
    const userId = req.params.userId;
    const date = req.params.date;

    const reservation = await reservationService.findReservationByDate(date, userId);
    if( !reservation ) return res.status(404).send({ message: "No existe una reserva para esa fecha" });

    await reservationService.deleteReservation(reservation);
    return res.send({ message: "Success" });
};

const update = async (req,res) => {
    const userId = req.params.userId;
    const date = req.params.date;
    const data = req.body;

    const reservation = await reservationService.findReservationByDate(date, userId);
    if( !reservation ) return res.status(404).send({ message: "No existe una reserva para esa fecha" });

    await reservationService.update(data, reservation);
    return res.send({ message: "Success" });
};

const changeStatus = async (req,res) =>{
    const date = req.params.date;
    const state = req.body.state;
    const userId = req.body.userId;

    await reservationService.updateState(date, state, userId);
    return res.send({ message: "Success" });
};

const getReservationByDate = async (req,res) => {
    const date = req.params.date;

    const reservation = await reservationService.getAllReservationsByDate(date);
    return res.send({ message: "Success", reservation });
};

const validateMoreOneReservationForPerson = async (date, userId) => {

    const reservation = await reservationService.findReservationByDate(date, userId);

    return ( reservation ) ? true : false;
};

module.exports = {
    changeStatus,
    createReservation,
    getAll,
    getAllReservationForUser,
    getReservationByDate,
    destoy,
    update,
    validateMoreOneReservationForPerson,
};
