const vehicleTypeRepository = require("../../src/repository/vehicleType.repository");
const { db } = require("../../src/models");
const { vehicleType, vehicleTypeUpdate, vehicleTypes } = require("../mock/vehicleType");

describe("Vehicle Type Repository", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    test("create", async () => {
        jest.spyOn(db.vehicle_type, "create").mockResolvedValueOnce(vehicleType)

        const response = await vehicleTypeRepository.create(vehicleType)

        expect(response).toEqual(vehicleType)
    });

    test("findAll", async () => {
        jest.spyOn(db.vehicle_type, "findAll").mockResolvedValueOnce(vehicleTypes)

        const response = await vehicleTypeRepository.findAll()

        expect(response).toEqual(vehicleTypes)
    });

    test("findOne", async () => {
        jest.spyOn(db.vehicle_type, "findOne").mockResolvedValueOnce(vehicleType)

        const response = await vehicleTypeRepository.findOne(vehicleType)

        expect(response).toEqual(vehicleType)
    });

    test("findByVehicleId", async () => {
        jest.spyOn(db.vehicle_type, "findByPk").mockResolvedValueOnce(vehicleType)

        const response = await vehicleTypeRepository.findByVehicleId(1)

        expect(response).toEqual(vehicleType)
    });

    test("update", async () => {
        jest.spyOn(db.vehicle_type, "update").mockResolvedValueOnce(true)

        const response = await vehicleTypeRepository.update(vehicleTypeUpdate, 1)

        expect(response).toEqual(true)
    });

    test("destroy", async () => {
        jest.spyOn(db.vehicle_type, "destroy").mockResolvedValueOnce(true)

        const response = await vehicleTypeRepository.destroy(1)

        expect(response).toEqual(true)
    });
});