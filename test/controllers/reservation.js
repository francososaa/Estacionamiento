const request = require("supertest");
const app = require("../../app");
const server = require("../../server");
const reservationController = require("../../src/controllers/reservation");
const reservationService = require("../../src/services/reservation.service");
const vehicleService = require("../../src/services/vehicle.service");
const buildingCapacityService = require("../../src/services/building_capacity.service");
const { newReservation, reservation, reservations, update, updateStatus } = require("../mock/reservation");

jest.mock("../../src/services/reservation.service");

jest.mock("../../src/middlewares/validateMiddlewares", () => (
    {
        ...jest.requireActual("../../src/middlewares/validateMiddlewares"),
        validarJWT: jest.fn().mockImplementation((req, res, next) => { req, res, next() }),
        checkRoleAdminAndUser: jest.fn().mockImplementation((req, res, next) => { req, res, next() }),
        checkRoleAdmin: jest.fn().mockImplementation((req, res, next) => { req, res, next() }),
        checkRoleEmployee: jest.fn().mockImplementation((req, res, next) => { next() }),
    }
));

afterAll(() => {
    jest.clearAllMocks();
    server.close();
});

describe('Reservation', () => {
    describe('New', () => {
        describe('Success', () => {
            test("Creacion de la reserva", async () => {

                jest.spyOn(vehicleService, "findVehicleById").mockImplementation(() => true )
                
                jest.spyOn(reservationController, "validateInputData").mockImplementation(() => true )
                
                jest.spyOn(buildingCapacityService, "isCompleteOverallCapacity").mockImplementation(() => false )
                
                jest.spyOn(buildingCapacityService, "updateCapacity").mockImplementation(() => true )
                
                jest.spyOn(reservationService, "create").mockImplementation(() => reservation )
        
                await request(app)
                    .post("/api/v1/reservation")
                    .set("authentication","123456")
                    .send(newReservation)
                    .expect(201)
                    .expect({ message: "Reserva creada correctamente",  reservation })
            });
        });

        describe('Failed', () => {
            test("El vehiculo no existe", async () => {

                jest.spyOn(vehicleService, "findVehicleById").mockImplementation(() => false )
                 
                await request(app)
                    .post("/api/v1/reservation")
                    .set("authentication","123456")
                    .send(newReservation)
                    .expect(404)
                    .expect({ message: "Vehiculo inexistente" })
            });

            describe.skip("validate input data", () => {
                test("Error en la validacion", async () => {
 
                    jest.spyOn(reservationController, "validateInputData").mockImplementation(() => false )
                    
                    await request(app)
                        .post("/api/v1/reservation")
                        .set("authentication","123456")
                        .send(newReservation)
                        .expect(400)
                        .expect({ message: "Revise los campos de entrada." })
                });

                test("Ya hay una reserva con este usuario para esta fecha", async () => {
 
                    jest.spyOn(reservationController, "validateMoreOneReservationForPerson").mockImplementation(() => true )
                    
                    await request(app)
                        .post("/api/v1/reservation")
                        .set("authentication","123456")
                        .send(newReservation)
                        .expect(400)
                        .expect({ message: "Ya hay una reserva con este usuario para esta fecha."})
                });
            });

            test("No hay lugar disponible para la fecha seleccionada.", async () => {

                jest.spyOn(vehicleService, "findVehicleById").mockImplementation(() => true )
                
                jest.spyOn(reservationController, "validateInputData").mockImplementation(() => false )
                
                jest.spyOn(buildingCapacityService, "isCompleteOverallCapacity").mockImplementation(() => true )
                
                jest.spyOn(buildingCapacityService, "updateCapacity").mockImplementation(() => true )
                
                jest.spyOn(reservationService, "create").mockImplementation(() => reservation )
        
                await request(app)
                    .post("/api/v1/reservation")
                    .set("authentication","123456")
                    .send(newReservation)
                    .expect(400)
                    .expect({ message: "No hay lugar disponible para la fecha seleccionada." })
            });
            
            test("Ocurrio un error al crear la reserva", async () => {

                jest.spyOn(vehicleService, "findVehicleById").mockImplementation(() => true )
                
                jest.spyOn(reservationController, "validateInputData").mockImplementation(() => false )
                
                jest.spyOn(buildingCapacityService, "isCompleteOverallCapacity").mockImplementation(() => false )
                
                jest.spyOn(buildingCapacityService, "updateCapacity").mockImplementation(() => true )
                
                jest.spyOn(reservationService, "create").mockRejectedValue()
        
                await request(app)
                    .post("/api/v1/reservation")
                    .set("authentication","123456")
                    .send(newReservation)
                    .expect(500)
                    .expect({  message: "Ocurrio un error al crear la reserva" })
            });
        });
    });

    describe.skip('Get all reservation for user', () => {
        test("Obtener todas las reservas para un usuario", async () => {

            jest.spyOn(reservationService, "getAllReservationForUser").mockImplementation(() => reservations )

            await request(app)
                .get("/api/v1/reservation")
                .set("authentication","123456")
                .expect(200)
                .expect({  message: "Success", reservation: reservations })
        });
    });

    describe.skip('Update', () => {
        describe('Success', () => {
            test("Actualizacion de una reserva", async () => {

                jest.spyOn(reservationService, "findReservationByDate").mockImplementation(() => true )

                jest.spyOn(reservationService, "update").mockImplementation(() => true)
    
                await request(app)
                    .put("/api/v1/reservation/2023-12-11")
                    .set("authentication","123456")
                    .send(update)
                    .expect(200)
                    .expect({ message: "Success" })
            });
        });

        describe('Failed', () => {
            test("No existe una reserva para esa fecha", async () => {

                jest.spyOn(reservationService, "findReservationByDate").mockImplementation(() => flase )

                await request(app)
                    .put("/api/v1/reservation/2023-12-11")
                    .set("authentication","123456")
                    .send(update)
                    .expect(404)
                    .expect({ message: "No existe la reserva" })
            });
        });
    });

    describe.skip('Destroy', () => {
        describe('Success', () => {
            test("Eliminar una reserva", async () => {

                jest.spyOn(reservationService, "findReservationByDate").mockImplementation(() => true )

                jest.spyOn(reservationService, "deleteReservation").mockImplementation(() => true)
    
                await request(app)
                    .delete("/api/v1/reservation/2023-12-11")
                    .set("authentication","123456")
                    .expect(200)
                    .expect({  message: "Success" })
            });
        });

        describe('Failed', () => {
            test("No existe una reserva para esa fecha", async () => {

                jest.spyOn(reservationService, "findReservationByDate").mockImplementation(() => false )

                await request(app)
                    .delete("/api/v1/reservation/2023-12-11")
                    .set("authentication","123456")
                    .expect(404)
                    .expect({ message: "No existe una reserva para esa fecha" })
            });
        });
    });

    describe('Get All', () => {
        test("Obtener todas las reservas para un administrador", async () => {

            jest.spyOn(reservationService, "getAll").mockImplementation(() => reservations )

            await request(app)
                .get("/api/v1/reservation")
                .set("authentication","123456")
                .expect(200)
                .expect({  message: "Success", reservation: reservations })
        });
    });

    describe('Get reservation by date', () => {
        test("Obtener todas las reservas para una fecha para el seguridad", async () => {

            jest.spyOn(reservationService, "getAllReservationsByDate").mockImplementation(() => reservations )

            await request(app)
                .get("/api/v1/reservation/employee/2023-12-11")
                .set("authentication","123456")
                .expect(200)
                .expect({  message: "Success", reservation: reservations })
        });
    });

    describe('Change status', () => {
        test("Cambiar el estado de una reserva. Para el seguridad", async () => {

            jest.spyOn(reservationService, "updateState").mockImplementation(() => true )

            await request(app)
                .put("/api/v1/reservation/employee/2023-12-11")
                .set("authentication","123456")
                .send(updateStatus)
                .expect(200)
                .expect({  message: "Success" })
        });
    });
});
