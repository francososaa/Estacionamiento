const reservationRepository = require("../../src/repository/reservation.repository");
const vehicleRepository = require("../../src/repository/vehicle.repository");
const reservationService = require("../../src/services/reservation.service");
const buildingCapacityService = require("../../src/services/building_capacity.service");
const dataUtil = require("../../src/utils/dateUtil");
const { reservation, reservations, reservationsByDate } = require("../mock/reservation");
const { vehicle } = require("../mock/vehicle");
const { date, id } = require("../mock/generalMock");

describe("Reservation Service", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    test("create", async () => {
        jest.spyOn(reservationRepository, "create").mockResolvedValueOnce(reservation)

        const response = await reservationService.create(reservation)

        expect(response).toEqual(reservation)
    });

    test("getAllReservationForUser", async () => {
        jest.spyOn(reservationRepository, "getAll").mockResolvedValueOnce(reservations)

        const response = await reservationService.getAllReservationForUser(`${id}`)

        expect(response).toEqual(reservations)
    });

    test("getAll", async () => {
        jest.spyOn(reservationRepository, "getAllAdmin").mockResolvedValueOnce(reservations)

        const response = await reservationService.getAll()

        expect(response).toEqual(reservations)
    });

    test("getAllReservationsByDate", async () => {
        jest.spyOn(reservationRepository, "findAllByDate").mockResolvedValueOnce(reservationsByDate)

        const response = await reservationService.getAllReservationsByDate(`${date}`)

        expect(response).toEqual(reservationsByDate)
    });

    test("cancelAllReservationsByVehicle", async () => {
        jest.spyOn(dataUtil, "formatDate").mockResolvedValueOnce(`${date}`)
        jest.spyOn(reservationRepository, "deleteReservationForDateAndVehicleId").mockResolvedValueOnce(true)
        jest.spyOn(buildingCapacityService, "decreaseCapacity").mockResolvedValueOnce(true)

        const response = await reservationService.cancelAllReservationsByVehicle(reservations, vehicle)

        expect(response).toEqual(true)
    });

    test("findAllReservationForVehicle", async () => {
        jest.spyOn(reservationRepository, "findAllRerservationByPk").mockResolvedValueOnce(reservations)

        const response = await reservationService.findAllReservationForVehicle(`${id}`)

        expect(response).toEqual(reservations)
    });

    test("findReservationByDate", async () => {
        jest.spyOn(reservationRepository, "findByDateAndUserId").mockResolvedValueOnce(reservation)

        const response = await reservationService.findReservationByDate(`${date}`,`${id}`)

        expect(response).toEqual(reservation)
    });

    test("deleteReservation", async () => {
        jest.spyOn(vehicleRepository, "findById").mockResolvedValueOnce(vehicle)
        jest.spyOn(reservationRepository, "deleteReservationForDateAndVehicleId").mockResolvedValueOnce(true)
        jest.spyOn(buildingCapacityService, "decreaseCapacity").mockResolvedValueOnce(true)

        const response = await reservationService.deleteReservation(reservation)

        expect(response).toEqual(true)
    });

    test("update", async () => {
        jest.spyOn(reservationRepository, "updateReservationVehicleId").mockResolvedValueOnce(true)

        const response = await reservationService.update(`${date}`, reservation)

        expect(response).toEqual(true)
    });

    test("updateState", async () => {
        jest.spyOn(reservationRepository, "updateReservationState").mockResolvedValueOnce(true)

        const response = await reservationService.updateState(`${date}`, "CANCELLED", `${id}`)

        expect(response).toEqual(true)
    });

});