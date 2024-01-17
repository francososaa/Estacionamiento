const buildingCapacityRepository = require("../../src/repository/building_capacity.repository");
const { db } = require("../../src/models");
const { buildingCapacity, capacity, newCapacity } = require("../mock/building_capacity");
const { date, id } = require("../mock/generalMock");

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

        const response = await buildingCapacityRepository.findByDateAndVehicleType(`${date}`, `${id}`)

        expect(response).toEqual(capacity)
    });

    test("updateCapacityForDateAndVehicleType", async () => {
        jest.spyOn(db.building_capacity, "update").mockResolvedValueOnce(true)

        const response = await buildingCapacityRepository.updateCapacityForDateAndVehicleType(`${date}`, `${id}`, 50)

        expect(response).toEqual(true)
    });

    test("destroyForDateAndVehicleType", async () => {
        jest.spyOn(db.building_capacity, "destroy").mockResolvedValueOnce(true)

        const response = await buildingCapacityRepository.destroyForDateAndVehicleType(`${date}`, `${id}`)

        expect(response).toEqual(true)
    });

});