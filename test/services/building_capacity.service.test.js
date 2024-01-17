const buildingCapacityRepository = require("../../src/repository/building_capacity.repository");
const buildingCapacityService = require("../../src/services/building_capacity.service");
const { buildingCapacity, capacity, newCapacity} = require("../mock/building_capacity");
const { date, id } = require("../mock/generalMock");
describe("Building Capacity Service", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    test("create", async () => {
        jest.spyOn(buildingCapacityRepository, "create").mockResolvedValueOnce(newCapacity)

        const response = await buildingCapacityService.create(newCapacity)

        expect(response).toEqual(newCapacity)
    });

    test("getAll", async () => {
        jest.spyOn(buildingCapacityRepository, "findAll").mockResolvedValueOnce(capacity)

        const response = await buildingCapacityService.getAll()

        expect(response).toEqual(capacity)
    });

    test("isCompleteOverallCapacity", async () => {
        jest.spyOn(buildingCapacityRepository, "findByDateAndVehicleType").mockResolvedValueOnce(buildingCapacity)

        const response = await buildingCapacityService.isCompleteOverallCapacity(`${date}`)

        expect(response).toEqual(false)
    });
    
    test("updateOverallCapacityForDateAndTypeVehicle", async () => {
        jest.spyOn(buildingCapacityRepository, "updateCapacityForDateAndVehicleType").mockResolvedValueOnce(true)

        const response = await buildingCapacityService.updateOverallCapacityForDateAndTypeVehicle(`${date}`, `${id}`, 200)

        expect(response).toEqual(true)
    });

    // test("updateCapacity", async () => {
    //     jest.spyOn(buildingCapacityService, "increaseCapacity").mockResolvedValueOnce(buildingCapacity)

    //     jest.spyOn(db.sequelize, "transaction").mockResolvedValueOnce({
    //         save: jest.fn()})  
    //     })

    //     const response = await buildingCapacityService.updateCapacity("2023-12-15", 1)

    //     expect(response).toEqual(buildingCapacity)
    // });

    test("validaDateAndType", async () => {
        jest.spyOn(buildingCapacityRepository, "findByDateAndVehicleType").mockResolvedValueOnce(buildingCapacity)

        const response = await buildingCapacityService.validaDateAndType()

        expect(response).toEqual(buildingCapacity)
    });

    // test("decreaseCapacity", async () => {

    //    jest.spyOn(buildingCapacityService, "decreaseCapacity").mockImplementation(buildingCapacity)

    //     const response = await buildingCapacityService.decreaseCapacity("2023-12-15", 1)

    //     expect(response).toEqual(buildingCapacity)
    // });

    test("increaseCapacity", async () => {
        jest.spyOn(buildingCapacityRepository, "findByDateAndVehicleType").mockResolvedValueOnce(buildingCapacity)

        const response = await buildingCapacityService.increaseCapacity(`${date}`, `${id}`)

        expect(response).toEqual(buildingCapacity)
    });

    test("destroyForDateAndVehicleType", async () => {
        jest.spyOn(buildingCapacityRepository, "destroyForDateAndVehicleType").mockResolvedValueOnce(true)

        const response = await buildingCapacityService.destroyForDateAndVehicleType(`${date}`, `${id}`)

        expect(response).toEqual(true)
    });
});