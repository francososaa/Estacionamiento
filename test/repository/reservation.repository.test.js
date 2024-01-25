const reservationRepository = require("../../src/repository/reservation.repository");
const { db } = require("../../src/models");
const { newReservation, reservation, reservations, reservationsByDate, update, updateStatus } = require("../mock/reservation");

describe("Reservation Repository", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    test("getAll", async () => {
        jest.spyOn(db.reservation, "findAll").mockResolvedValueOnce(reservations)

        const response = await reservationRepository.getAll(1)

        expect(response).toEqual(reservations)
    });

    test("getAllAdmin", async () => {
        jest.spyOn(db.reservation, "findAll").mockResolvedValueOnce(reservations)

        const response = await reservationRepository.getAllAdmin()

        expect(response).toEqual(reservations)
    });

    test("create", async () => {
        jest.spyOn(db.reservation, "create").mockResolvedValueOnce(reservation)

        const response = await reservationRepository.create(newReservation)

        expect(response).toEqual(reservation)
    });

    test("findByDateAndUserId", async () => {
        jest.spyOn(db.reservation, "findOne").mockResolvedValueOnce(reservationsByDate)

        const response = await reservationRepository.findByDateAndUserId("2023-12-15", 1)

        expect(response).toEqual(reservationsByDate)
    });

    test("findAllRerservationByPk", async () => {
        jest.spyOn(db.reservation, "findAll").mockResolvedValueOnce(reservations)

        const response = await reservationRepository.findAllRerservationByPk(1)

        expect(response).toEqual(reservations)
    });

    test("findAllByDate", async () => {
        jest.spyOn(db.reservation, "findAll").mockResolvedValueOnce(reservationsByDate)

        const response = await reservationRepository.findAllByDate("2023-12-15")

        expect(response).toEqual(reservationsByDate)
    });

    test("deleteReservationForDateAndVehicleId", async () => {
        jest.spyOn(db.reservation, "destroy").mockResolvedValueOnce(true)

        const response = await reservationRepository.deleteReservationForDateAndVehicleId("2023-12-15", 1)

        expect(response).toEqual(true)
    });

    test("updateReservationState", async () => {
        jest.spyOn(db.reservation, "update").mockResolvedValueOnce(true)

        const response = await reservationRepository.updateReservationState("IN PROGRESS", "transaction", 1)

        expect(response).toEqual(true)
    });

    test("updateReservationVehicleId", async () => {
        jest.spyOn(db.reservation, "update").mockResolvedValueOnce(true)

        const response = await reservationRepository.updateReservationVehicleId(update, "2023-12-15", 1)

        expect(response).toEqual(true)
    });

    test("updateReservationState", async () => {
        jest.spyOn(db.reservation, "update").mockResolvedValueOnce(true)

        const response = await reservationRepository.updateReservationState(update, "IN PROGRESS" , 1)

        expect(response).toEqual(true)
    });

});