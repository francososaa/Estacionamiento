const logger = require('../utils/logger');
const reservationService = require('../services/reservation.service');
const buildingCapacityService = require('../services/building_capacity.service');
const vehicleService = require('../services/vehicle.service');
const reservationDAO = require('../repository/reservation.repository');

const createReservation = async(req,res) => {
    
    let reservation = req.body;

    try{

        // Busco el vehiculo
        const reservationVehicle = await vehicleService.findVehicleById(reservation.vehicleId);
        if( !reservationVehicle ) return res.status(500).send({ message: "Vehiculo inexistente"})
        reservation.vehicle = reservationVehicle;

        // Valido datos de entrada
        const inputDataValidation = await validateInputData(reservation);
        if( !inputDataValidation.isOk ) return res.status(400).send({ message: inputDataValidation.message}); 

        // Valido que haya lugar disponible antes de guardar la reserva
        const overallCapacity = await buildingCapacityService.isCompleteOverallCapacity(reservation.date, reservation.vehicle.vehicleTypeId);
        if( overallCapacity.isCompleteOverallCapacity ) return res.status(400).send({ message: "No hay lugar disponible para la fecha seleccionada." });
        
        // Obtengo la building capacity modificada
        const buildingCapacity = await buildingCapacityService.updateCapacity(reservation.date, reservation.vehicle.vehicleTypeId);
        if ( !buildingCapacity ) return res.status(400).send({ message : "No hay disponibilidad" });

        // Realizo la reserva
        reservation.state = "CREATED";

        const createReservation = await reservationService.create(reservation);

        return res.send({ reservation: createReservation, message: "Reserva creada correctamente" });
        // sendMailCreateReservation(reservation);

    } catch(error){
        logger.error("Error al crear la reserva");
        return res.status(500).send({ message: "Ocurrio un error al crear la reserva" });
    }
};

const validateInputData = async(reservation) => {

    let validationAfterReservation = {
        isOk: false,
        message: null,
    };

    // Valido campos obligatorios
    if( !reservation.date || !reservation.vehicleId || !reservation.userId ){
        validationAfterReservation.message = "Revise los campos de entrada.";
        return validationAfterReservation;
    };

    // Valido si existe una reserva para el usuario 
    const existReservationForPerson = await validateMoreOneReservationForPerson(reservation.date, reservation.userId);
    if( existReservationForPerson ) {
        validationAfterReservation.message = "Ya hay una reserva con este usuario para esta fecha.";
        return validationAfterReservation;
    };

    validationAfterReservation.isOk = true;
    return validationAfterReservation;
};

const validateMoreOneReservationForPerson = async(date, userId) => {
    const reservation = await reservationDAO.findByDateAndUserId(date, userId);
    
    return ( reservation === null) ? false : true;
};

module.exports = {
    createReservation,
};
