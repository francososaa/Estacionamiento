const logger = require('../utils/logger');
const reservationService = require('../services/reservation.service');
const buildingCapacityService = require('../services/building_capacity.service');
const vehicleService = require('../services/vehicle.service');
const reservationDAO = require('../repository/reservation.repository');

const createReservation = async(req,res) => {
    
    let reservation = req.body;

    try{
        const reservationVehicle = await vehicleService.findVehicleById(reservation.vehicleId);
        if(!reservationVehicle) return res.status(500).send({ message: "Vehiculo inexistente"})
        reservation.vehicle = reservationVehicle;

        const inputDataValidation = await validateInputData(reservation);
        if(!inputDataValidation.isOk) return res.status(400).send({ message: inputDataValidation.message}); 

        const overallCapacity = await buildingCapacityService.isCompleteOverallCapacity(reservation.date, reservation.vehicle.vehicleTypeId);
        if(overallCapacity) return res.status(400).send({ message: "No hay lugar disponible para la fecha seleccionada." });
        
        await buildingCapacityService.updateCapacity(reservation.date, reservation.vehicle.vehicleTypeId);

        reservation.state = "CREATED";

        const createReservation = await reservationService.create(reservation);

        return res.send({  message: "Reserva creada correctamente", reservation: createReservation });

    } catch(error){
        logger.error("Error al crear la reserva");
        return res.status(500).send({ message: "Ocurrio un error al crear la reserva" });
    }
};

const validateInputData = async (reservation) => {

    let validationAfterReservation = {
        isOk: false,
        message: null,
    };

    if( !reservation.date || !reservation.vehicleId || !reservation.userId ){
        validationAfterReservation.message = "Revise los campos de entrada.";
        return validationAfterReservation;
    };

    const existReservationForPerson = await validateMoreOneReservationForPerson(reservation.date, reservation.userId);
    if(existReservationForPerson) {
        validationAfterReservation.message = "Ya hay una reserva con este usuario para esta fecha.";
        return validationAfterReservation;
    };

    validationAfterReservation.isOk = true;
    return validationAfterReservation;
};

const validateMoreOneReservationForPerson = async (date, userId) => {
    const reservation = await reservationDAO.findByDateAndUserId(date, userId);
    return ( reservation === null) ? false : true;
};

module.exports = {
    createReservation,
};
