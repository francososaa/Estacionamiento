const request = require("supertest");
const app = require("../../app");
const server = require("../../server");
const reservationController = require("../../src/controllers/reservation");
const reservationService = require("../../src/services/reservation.service");
const vehicleService = require("../../src/services/vehicle.service");
const buildingCapacityService = require("../../src/services/building_capacity.service");
const { newReservation, reservation, reservations, update, updateStatus } = require("../mock/reservation");

jest.mock("../../src/middlewares/validateMiddlewares2", () => (
    {
        ...jest.requireActual("../../src/middlewares/validateMiddlewares2"),
        validarJWT: jest.fn().mockImplementation((req, res, next) => { req, res, next() }),
        checkRoleAdminAndUser: jest.fn().mockImplementation((req, res, next) => { req, res, next() }),
        checkRoleAdmin: jest.fn().mockImplementation((req, res, next) => { req, res, next() }),
        checkRoleEmployee: jest.fn().mockImplementation((req, res, next) => { next() }),
    }
));

beforeEach(() => {
    server.close();
});

afterEach(() => {
    jest.clearAllMocks();
});

describe("Reservation", () => {

    describe("New", () => {

        test("Creacion de la reserva", async () => {

            jest.spyOn(vehicleService, "findVehicleById").mockImplementation(() => true )  
            jest.spyOn(reservationController, "validateInputData").mockImplementation(() => true )
            jest.spyOn(buildingCapacityService, "isCompleteOverallCapacity").mockImplementation(() => false )
            jest.spyOn(buildingCapacityService, "updateCapacity").mockImplementation(() => true )
            jest.spyOn(reservationService, "create").mockImplementation(() => reservation )
    
            await request(app)
                .post("/api/v1/reservation/12345")
                .set("authentication","123456")
                .send(newReservation)
                .expect(201)
                .expect({ message: "Reserva creada correctamente",  reservation })
        });


        describe("Failed", () => {
            test("El vehiculo no existe", async () => {

                jest.spyOn(vehicleService, "findVehicleById").mockImplementation(() => false )
                 
                await request(app)
                    .post("/api/v1/reservation/12345")
                    .set("authentication","123456")
                    .send(newReservation)
                    .expect(404)
                    .expect({ message: "Vehiculo inexistente" })
            });

            test("No hay lugar disponible para la fecha seleccionada.", async () => {

                jest.spyOn(vehicleService, "findVehicleById").mockImplementation(() => true )
                jest.spyOn(reservationController, "validateInputData").mockImplementation(() => false )                
                jest.spyOn(buildingCapacityService, "isCompleteOverallCapacity").mockImplementation(() => true )               
                jest.spyOn(buildingCapacityService, "updateCapacity").mockImplementation(() => true )             
                jest.spyOn(reservationService, "create").mockImplementation(() => reservation )
        
                await request(app)
                    .post("/api/v1/reservation/12345")
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
                    .post("/api/v1/reservation/12345")
                    .set("authentication","123456")
                    .send(newReservation)
                    .expect(500)
                    .expect({  message: "Ocurrio un error al crear la reserva" })
            });
        });
    });

    describe("Get all reservation for user", () => {
        test("Obtener todas las reservas para un usuario", async () => {

            jest.spyOn(reservationService, "getAllReservationForUser").mockImplementation(() => reservations )

            await request(app)
                .get("/api/v1/reservation/12345")
                .set("authentication","123456")
                .expect(200)
                .expect({  message: "Success", reservation: reservations })
        });
    });

    describe("Update", () => {
      
        test("Actualizacion de una reserva", async () => {

            jest.spyOn(reservationService, "findReservationByDate").mockImplementation(() => true )
            jest.spyOn(reservationService, "update").mockImplementation(() => true)

            await request(app)
                .put("/api/v1/reservation/12345/date/2023-12-11")
                .set("authentication","123456")
                .send(update)
                .expect(200)
                .expect({ message: "Success" })
        });
   
        test("No existe una reserva para esa fecha", async () => {

            jest.spyOn(reservationService, "findReservationByDate").mockImplementation(() => flase )

            await request(app)
                .put("/api/v1/reservation/12345/date/2023-12-11")
                .set("authentication","123456")
                .send(update)
                .expect(404)
                .expect({ message: "No existe la reserva" })
        });
    });

    describe("Destroy", () => {
        
        test("Eliminar una reserva", async () => {

            jest.spyOn(reservationService, "findReservationByDate").mockImplementation(() => true )

            jest.spyOn(reservationService, "deleteReservation").mockImplementation(() => true)

            await request(app)
                .delete("/api/v1/reservation/12345/date/2023-12-11")
                .set("authentication","123456")
                .expect(200)
                .expect({  message: "Success" })
        });
    
        test("No existe una reserva para esa fecha", async () => {

            jest.spyOn(reservationService, "findReservationByDate").mockImplementation(() => false )

            await request(app)
                .delete("/api/v1/reservation/12345/date/2023-12-11")
                .set("authentication","123456")
                .expect(404)
                .expect({ message: "No existe una reserva para esa fecha" })
        });
        
    });

    describe("Get All", () => {
        test("Obtener todas las reservas para un administrador", async () => {

            jest.spyOn(reservationService, "getAll").mockImplementation(() => reservations )

            await request(app)
                .get("/api/v1/reservation")
                .set("authentication","123456")
                .expect(200)
                .expect({  message: "Success", reservation: reservations })
        });
    });

    describe("Get reservation by date", () => {
        test("Obtener todas las reservas para una fecha para el seguridad", async () => {

            jest.spyOn(reservationService, "getAllReservationsByDate").mockImplementation(() => reservations )

            await request(app)
                .get("/api/v1/reservation/employee/date/2023-12-11")
                .set("authentication","123456")
                .expect(200)
                .expect({  message: "Success", reservation: reservations })
        });
    });

    describe("Change status", () => {
        test("Cambiar el estado de una reserva. Para el seguridad", async () => {

            jest.spyOn(reservationService, "updateState").mockImplementation(() => true )

            await request(app)
                .put("/api/v1/reservation/employee/date/2023-12-11")
                .set("authentication","123456")
                .send(updateStatus)
                .expect(200)
                .expect({  message: "Success" })
        });
    });
});
