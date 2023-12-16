const buildingCapacityRepository = require("../../src/repository/building_capacity.repository");
const { db } = require("../../src/models");
const { buildingCapacity, capacity, newCapacity } = require("../mock/building_capacity");

describe("Building Capacity Repository", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    test("create", async () => {
        jest.spyOn(db.building_capacity, "create").mockResolvedValueOnce(buildingCapacity)

        const response = await buildingCapacityRepository.create(newCapacity)

        expect(response).toEqual(buildingCapacity)
    });

    test("findAll", async () => {
        jest.spyOn(db.building_capacity, "findAll").mockResolvedValueOnce(capacity)

        const response = await buildingCapacityRepository.findAll()

        expect(response).toEqual(capacity)
    });

    test("findByDateAndVehicleType", async () => {
        jest.spyOn(db.building_capacity, "findOne").mockResolvedValueOnce(capacity)

        const response = await buildingCapacityRepository.findByDateAndVehicleType("2023-12-15", 1)

        expect(response).toEqual(capacity)
    });

    test("updateCapacityForDateAndVehicleType", async () => {
        jest.spyOn(db.building_capacity, "update").mockResolvedValueOnce(true)

        const response = await buildingCapacityRepository.updateCapacityForDateAndVehicleType("2023-12-15", 1, 50)

        expect(response).toEqual(true)
    });

    test("destroyForDateAndVehicleType", async () => {
        jest.spyOn(db.building_capacity, "destroy").mockResolvedValueOnce(true)

        const response = await buildingCapacityRepository.destroyForDateAndVehicleType("2023-12-15", 1)

        expect(response).toEqual(true)
    });

});