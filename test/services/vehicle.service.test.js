const vehicleRepository = require("../../src/repository/vehicle.repository");
const vehicleService = require("../../src/services/vehicle.service");
const reservationService = require("../../src/services/reservation.service");
const { allVehicles, newVehicle, vehicle } = require("../mock/vehicle");
const { reservations } = require("../mock/reservation");

describe("Vehicle Service", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    test("allVehicles", async () => {
        jest.spyOn(vehicleRepository, "findAllForUser").mockResolvedValueOnce(allVehicles)

        const response = await vehicleService.allVehicles(1)

        expect(response).toEqual(allVehicles)
    });

    test("create", async () => {
        jest.spyOn(vehicleRepository, "create").mockResolvedValueOnce(vehicle)

        const response = await vehicleService.create(newVehicle)

        expect(response).toEqual(vehicle)
    });

    test("findVehicleByLicense", async () => {
        jest.spyOn(vehicleRepository, "findByLicense").mockResolvedValueOnce(vehicle)

        const response = await vehicleService.findVehicleByLicense("OTC015",1)

        expect(response).toEqual(vehicle)
    });

    test("findVehicleById", async () => {
        jest.spyOn(vehicleRepository, "findById").mockResolvedValueOnce(vehicle)

        const response = await vehicleService.findVehicleById(1)

        expect(response).toEqual(vehicle)
    });

    test("updateById", async () => {
        jest.spyOn(vehicleRepository, "updateById").mockResolvedValueOnce(vehicle)

        const response = await vehicleService.updateById(newVehicle,1)

        expect(response).toEqual(vehicle)
    });

    test("cancelVehicle", async () => {
        jest.spyOn(vehicleRepository, "changeStatus").mockResolvedValueOnce(true)
        jest.spyOn(reservationService, "findAllReservationForVehicle").mockResolvedValueOnce(reservations)
        jest.spyOn(reservationService, "cancelAllReservationsByVehicle").mockResolvedValueOnce(true)

        const response = await vehicleService.cancelVehicle(vehicle)

        expect(response).toEqual(true)
    });

});