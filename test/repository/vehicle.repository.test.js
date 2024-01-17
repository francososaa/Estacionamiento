const vehicleRepository = require("../../src/repository/vehicle.repository");
const { db } = require("../../src/models");
const { allVehicles, newVehicle, vehicle } = require("../mock/vehicle");
const { id, license } = require("../mock/generalMock");
describe("Vehicle Repository", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    test("create", async () => {
        jest.spyOn(db.vehicle, "create").mockResolvedValueOnce(vehicle)

        const response = await vehicleRepository.create(newVehicle)

        expect(response).toEqual(vehicle)
    });

    test("findByLicense", async () => {
        jest.spyOn(db.vehicle, "findOne").mockResolvedValueOnce(vehicle)

        const response = await vehicleRepository.findByLicense(`${license}`,`${id}`)

        expect(response).toEqual(vehicle)
    });

    test("findById", async () => {
        jest.spyOn(db.vehicle, "findOne").mockResolvedValueOnce(vehicle)

        const response = await vehicleRepository.findById(`${id}`)

        expect(response).toEqual(vehicle)
    });

    test("findAll", async () => {
        jest.spyOn(db.vehicle, "findAll").mockResolvedValueOnce(allVehicles)

        const response = await vehicleRepository.findAll()

        expect(response).toEqual(allVehicles)
    });

    test("findAllForUser", async () => {
        jest.spyOn(db.vehicle, "findAll").mockResolvedValueOnce(allVehicles)

        const response = await vehicleRepository.findAllForUser(`${id}`)

        expect(response).toEqual(allVehicles)
    });

    test("updateById", async () => {
        jest.spyOn(db.vehicle, "update").mockResolvedValueOnce(true)

        const response = await vehicleRepository.updateById(vehicle, `${id}`)

        expect(response).toEqual(true)
    });

    test("changeStatus", async () => {
        jest.spyOn(db.vehicle, "update").mockResolvedValueOnce(true)

        const response = await vehicleRepository.changeStatus(`${id}`)

        expect(response).toEqual(true)
    });
});