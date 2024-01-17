const reservationRepository = require("../../src/repository/reservation.repository");
const { db } = require("../../src/models");
const { newReservation, reservation, reservations, reservationsByDate, update, updateStatus } = require("../mock/reservation");
const { date, id } = require("../mock/generalMock");
describe("Reservation Repository", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    test("getAll", async () => {
        jest.spyOn(db.reservation, "findAll").mockResolvedValueOnce(reservations)

        const response = await reservationRepository.getAll(`${id}`)

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

        const response = await reservationRepository.findByDateAndUserId(`${date}`, `${id}`)

        expect(response).toEqual(reservationsByDate)
    });

    test("findAllRerservationByPk", async () => {
        jest.spyOn(db.reservation, "findAll").mockResolvedValueOnce(reservations)

        const response = await reservationRepository.findAllRerservationByPk(`${id}`)

        expect(response).toEqual(reservations)
    });

    test("findAllByDate", async () => {
        jest.spyOn(db.reservation, "findAll").mockResolvedValueOnce(reservationsByDate)

        const response = await reservationRepository.findAllByDate(`${date}`)

        expect(response).toEqual(reservationsByDate)
    });

    test("deleteReservationForDateAndVehicleId", async () => {
        jest.spyOn(db.reservation, "destroy").mockResolvedValueOnce(true)

        const response = await reservationRepository.deleteReservationForDateAndVehicleId(`${date}`, `${id}`)

        expect(response).toEqual(true)
    });

    test("updateReservationState", async () => {
        jest.spyOn(db.reservation, "update").mockResolvedValueOnce(true)

        const response = await reservationRepository.updateReservationState("IN PROGRESS", "transaction", `${id}`)

        expect(response).toEqual(true)
    });

    test("updateReservationVehicleId", async () => {
        jest.spyOn(db.reservation, "update").mockResolvedValueOnce(true)

        const response = await reservationRepository.updateReservationVehicleId(update, `${date}`, `${id}`)

        expect(response).toEqual(true)
    });

    test("updateReservationState", async () => {
        jest.spyOn(db.reservation, "update").mockResolvedValueOnce(true)

        const response = await reservationRepository.updateReservationState(update, "IN PROGRESS" , `${id}`)

        expect(response).toEqual(true)
    });

});