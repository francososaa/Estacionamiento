const request = require("supertest");
const app = require("../../app");
const server = require("../../server");
const reservationService = require("../../src/services/reservation.service");
const vehicleService = require("../../src/services/vehicle.service");
const buildingCapacityService = require("../../src/services/building_capacity.service");
const { newReservation, reservation, reservations, reservationsByDate, update, updateStatus } = require("../mock/reservation");
const { vehicle } = require("../mock/vehicle");
const { date, id } = require("../mock/generalMock");

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
    
        test("Success", async () => {

            jest.spyOn(vehicleService, "findVehicleById").mockResolvedValueOnce(vehicle)
            jest.spyOn(reservationService, "findReservationByDate").mockResolvedValueOnce(false)
            jest.spyOn(buildingCapacityService, "isCompleteOverallCapacity").mockResolvedValueOnce(false)
            jest.spyOn(buildingCapacityService, "updateCapacity").mockResolvedValueOnce(true)
            jest.spyOn(reservationService, "create").mockResolvedValueOnce(reservation)

    
            await request(app)
                .post(`/api/v1/reservation/${id}`)
                .set("authentication","123456")
                .send(newReservation)
                .expect(201)
                .expect({ message: "Reserva creada correctamente", reservation })
        });

        describe("Failed", () => {
            test("Vehiculo inexistente", async () => {

                jest.spyOn(vehicleService, "findVehicleById").mockResolvedValueOnce(false)

                await request(app)
                    .post(`/api/v1/reservation/${id}`)
                    .set("authentication","123456")
                    .send(newReservation)
                    .expect(404)
                    .expect({ message: "Vehiculo inexistente"  })
            });

            test("Ya hay una reserva con este usuario para esta fecha" , async () => {

                jest.spyOn(vehicleService, "findVehicleById").mockResolvedValueOnce(vehicle)
                jest.spyOn(reservationService, "findReservationByDate").mockResolvedValueOnce(reservation)

                await request(app)
                    .post(`/api/v1/reservation/${id}`)
                    .set("authentication","123456")
                    .send(newReservation)
                    .expect(400)
                    .expect({ message: "Ya hay una reserva con este usuario para esta fecha"   })
            });

            test("No hay lugar disponible para la fecha seleccionada", async () => {

                jest.spyOn(vehicleService, "findVehicleById").mockResolvedValueOnce(vehicle)
                jest.spyOn(reservationService, "findReservationByDate").mockResolvedValueOnce(false)
                jest.spyOn(buildingCapacityService, "isCompleteOverallCapacity").mockResolvedValueOnce(true)
    
                await request(app)
                    .post(`/api/v1/reservation/${id}`)
                    .set("authentication","123456")
                    .send(newReservation)
                    .expect(400)
                    .expect({ message: "No hay lugar disponible para la fecha seleccionada."})
            });

            test("Fallo la creacion de la reserva", async () => {

                jest.spyOn(vehicleService, "findVehicleById").mockResolvedValueOnce(vehicle)
                jest.spyOn(reservationService, "findReservationByDate").mockResolvedValueOnce(false)
                jest.spyOn(buildingCapacityService, "isCompleteOverallCapacity").mockResolvedValueOnce(false)
                jest.spyOn(buildingCapacityService, "updateCapacity").mockResolvedValueOnce(true)
                jest.spyOn(reservationService, "create").mockRejectedValue()
    
        
                await request(app)
                    .post(`/api/v1/reservation/${id}`)
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
                .get(`/api/v1/reservation/${id}`)
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
                .delete(`/api/v1/reservation/${id}/date/${date}`)
                .set("authentication","123456")
                .send()
                .expect(200)
                .expect({ message: "Success" })
        });

        test("No existe una reserva para esa fecha", async () => {

            jest.spyOn(reservationService, "findReservationByDate").mockResolvedValueOnce(false)

            await request(app)
                .delete(`/api/v1/reservation/${id}/date/${date}`)
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
                .put(`/api/v1/reservation/${id}/date/${date}`)
                .set("authentication","123456")
                .send()
                .expect(200)
                .expect({ message: "Success" })
        });

        test("No existe una reserva para esa fecha" , async () => {

            jest.spyOn(reservationService, "findReservationByDate").mockResolvedValueOnce(false)

            await request(app)
                .put(`/api/v1/reservation/${id}/date/${date}`)
                .set("authentication","123456")
                .send()
                .expect(404)
                .expect({ message: "No existe una reserva para esa fecha" })
        });
    });

    describe.skip("changeStatus", () => {
        test("Success", async () => {
            jest.spyOn(reservationService, "updateState").mockResolvedValueOnce(true)

            await request(app)
                .put(`/api/v1/reservation/employee/date/${date}`)
                .set("authentication","123456")
                .send(updateStatus)
                .expect(200)
                .expect({ message: "Success"})
        });
    });

    describe("getReservationByDate", () => {
        test("Success", async () => {

            jest.spyOn(reservationService, "getAllReservationsByDate").mockResolvedValueOnce(reservationsByDate)

            await request(app)
                .get(`/api/v1/reservation/employee/date/${date}`)
                .set("authentication","123456")
                .expect(200)
                .expect({ message: "Success", reservation: reservationsByDate })
        });
    });
});