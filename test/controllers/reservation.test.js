const request = require("supertest");
const app = require("../../app");
const server = require("../../server");
const reservationController = require("../../src/controllers/reservation");
const reservationService = require("../../src/services/reservation.service");
const reservationRepository = require("../../src/repository/reservation.repository");
const vehicleService = require("../../src/services/vehicle.service");
const buildingCapacityService = require("../../src/services/building_capacity.service");
const { newReservation, reservation, reservations, reservationsByDate, update, updateStatus } = require("../mock/reservation");
const { vehicle } = require("../mock/vehicle");

jest.mock("../../src/middlewares/validateMiddlewares", () => (
    {
        ...jest.requireActual("../../src/middlewares/validateMiddlewares"),
        validarJWT: jest.fn().mockImplementation((req, res, next) => { next() }),
        checkRoleUser: jest.fn().mockImplementation((req, res, next) => { next() }),
        checkRoleAdmin: jest.fn().mockImplementation((req, res, next) => { next() }),
        checkRoleEmployee: jest.fn().mockImplementation((req, res, next) => { next() }),
    }
));

beforeAll(() => {
    server.close();
});

afterAll(() => {
    jest.clearAllMocks();
});

describe("Reservation", () => {    

    describe("createReservation", () => {
    
        test.skip("Success", async () => {

            jest.spyOn(vehicleService, "findVehicleById").mockResolvedValueOnce(vehicle)
            jest.spyOn(reservationController, "validateMoreOneReservationForPerson").mockResolvedValueOnce(false)
            jest.spyOn(buildingCapacityService, "isCompleteOverallCapacity").mockResolvedValueOnce(false)
            jest.spyOn(buildingCapacityService, "updateCapacity").mockResolvedValueOnce(true)
            jest.spyOn(reservationService, "create").mockResolvedValueOnce()

    
            await request(app)
                .post("/api/v1/reservation/12345")
                .set("authentication","123456")
                .send(newReservation)
                .expect(201)
                .expect({ message: "Reserva creada correctamente", reservation })
        });

        describe("Failed", () => {
            test("Vehiculo inexistente", async () => {

                jest.spyOn(vehicleService, "findVehicleById").mockResolvedValueOnce(false)

                await request(app)
                    .post("/api/v1/reservation/12345")
                    .set("authentication","123456")
                    .send(newReservation)
                    .expect(404)
                    .expect({ message: "Vehiculo inexistente"  })
            });

            test.skip("Ya hay una reserva con este usuario para esta fecha" , async () => {

                jest.spyOn(vehicleService, "findVehicleById").mockResolvedValueOnce(vehicle)
                jest.spyOn(reservationController, "validateMoreOneReservationForPerson").mockResolvedValueOnce(true)

                await request(app)
                    .post("/api/v1/reservation/12345")
                    .set("authentication","123456")
                    .send(newReservation)
                    .expect(404)
                    .expect({ message: "Ya hay una reserva con este usuario para esta fecha"   })
            });

            test.skip("No hay lugar disponible para la fecha seleccionada", async () => {

                jest.spyOn(vehicleService, "findVehicleById").mockResolvedValueOnce(vehicle)
                jest.spyOn(buildingCapacityService, "isCompleteOverallCapacity").mockResolvedValueOnce(true)
    
                await request(app)
                    .post("/api/v1/reservation/12345")
                    .set("authentication","123456")
                    .send(newReservation)
                    .expect(400)
                    .expect({ message: "No hay lugar disponible para la fecha seleccionada."})
            });

            test("Fallo la creacion de la reserva", async () => {

                jest.spyOn(vehicleService, "findVehicleById").mockResolvedValueOnce(vehicle)
                jest.spyOn(buildingCapacityService, "isCompleteOverallCapacity").mockResolvedValueOnce(false)
                jest.spyOn(buildingCapacityService, "updateCapacity").mockResolvedValueOnce(true)
                jest.spyOn(reservationService, "create").mockRejectedValue()
    
        
                await request(app)
                    .post("/api/v1/reservation/12345")
                    .set("authentication","123456")
                    .send(newReservation)
                    .expect(500)
                    .expect({ message: "Ocurrio un error al crear la reserva"})
            });
        });
        

    });

    describe("getAll", () => {
        test("Success", async () => {

            jest.spyOn(reservationService, "getAll").mockResolvedValueOnce(reservations)

            await request(app)
                .get("/api/v1/reservation")
                .set("authentication","123456")
                .send()
                .expect(200)
                .expect({ message: "Success", reservations })
        });
    });

    describe("getAllReservationForUser", () => {
        test("Success", async () => {

            jest.spyOn(reservationService, "getAllReservationForUser").mockResolvedValueOnce(reservation)

            await request(app)
                .get("/api/v1/reservation/1234")
                .set("authentication","123456")
                .send()
                .expect(200)
                .expect({ message: "Success", reservation })
        });
    });

    describe("destoy", () => {
        test("Success", async () => {

            jest.spyOn(reservationService, "findReservationByDate").mockResolvedValueOnce(reservation)
            jest.spyOn(reservationService, "deleteReservation").mockResolvedValueOnce()

            await request(app)
                .delete("/api/v1/reservation/1234/date/2023-12-05")
                .set("authentication","123456")
                .send()
                .expect(200)
                .expect({ message: "Success" })
        });

        test("No existe una reserva para esa fecha", async () => {

            jest.spyOn(reservationService, "findReservationByDate").mockResolvedValueOnce(false)

            await request(app)
                .delete("/api/v1/reservation/1234/date/2023-12-05")
                .set("authentication","123456")
                .send()
                .expect(404)
                .expect({ message: "No existe una reserva para esa fecha" })
        });
    });

    describe("update", () => {
        test("Success", async () => {

            jest.spyOn(reservationService, "findReservationByDate").mockResolvedValueOnce(reservation)
            jest.spyOn(reservationService, "update").mockResolvedValueOnce()

            await request(app)
                .put("/api/v1/reservation/1234/date/2023-12-05")
                .set("authentication","123456")
                .send()
                .expect(200)
                .expect({ message: "Success" })
        });

        test("No existe una reserva para esa fecha" , async () => {

            jest.spyOn(reservationService, "findReservationByDate").mockResolvedValueOnce(false)

            await request(app)
                .put("/api/v1/reservation/1234/date/2023-12-05")
                .set("authentication","123456")
                .send()
                .expect(404)
                .expect({ message: "No existe una reserva para esa fecha" })
        });
    });

    describe("changeStatus", () => {
        test("Success", async () => {

            jest.spyOn(reservationService, "updateState").mockResolvedValueOnce(true)

            await request(app)
                .put("/api/v1/reservation/employee/date/2023-12-05")
                .set("authentication","123456")
                .send(updateStatus)
                .expect(200)
                .expect({ message: "Success" })
        });
    });

    describe("getReservationByDate", () => {
        test("Success", async () => {

            jest.spyOn(reservationService, "getAllReservationsByDate").mockResolvedValueOnce(reservationsByDate)

            await request(app)
                .get("/api/v1/reservation/employee/date/2023-12-05")
                .set("authentication","123456")
                .send()
                .expect(200)
                .expect({ message: "Success", reservation: reservationsByDate })
        });
    });

    describe.skip('validateMoreOneReservationForPerson', () => {
        test("Success", async () => {

            jest.spyOn(reservationRepository, "findByDateAndUserId").mockResolvedValueOnce(reservation)

            const response = await reservationController.validateMoreOneReservationForPerson("2023-12-05", 1)

            expect(response).toEqual(reservation)
        });
    });
});