const vehicleTypeRepository = require("../../src/repository/vehicleType.repository");
const vehicleTypeService = require("../../src/services/vehicleType.service");
const { vehicleType, vehicleTypes, vehicleTypeUpdate } = require("../mock/vehicleType");
const { id } = require("../mock/generalMock");
describe("Vehicle Type Service", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    test("Create", async () => {
        jest.spyOn(vehicleTypeRepository, "create").mockResolvedValueOnce(vehicleType)

        const response = await vehicleTypeService.create(vehicleType)

        expect(response).toEqual(vehicleType)
    });

    test("GetAll", async () => {
        jest.spyOn(vehicleTypeRepository, "findAll").mockResolvedValueOnce(vehicleTypes)

        const response = await vehicleTypeService.getAll()

        expect(response).toEqual(vehicleTypes)
    });

    test("FindVehicleType", async () => {
        jest.spyOn(vehicleTypeRepository, "findOne").mockResolvedValueOnce(vehicleType)

        const response = await vehicleTypeService.findVehicleType(vehicleType)

        expect(response).toEqual(vehicleType)
    });

    test("findById", async () => {
        jest.spyOn(vehicleTypeRepository, "findByVehicleId").mockResolvedValueOnce(vehicleType)

        const response = await vehicleTypeService.findById(`${id}`)

        expect(response).toEqual(vehicleType)
    });

    test("update", async () => {
        jest.spyOn(vehicleTypeRepository, "update").mockResolvedValueOnce(vehicleType)

        const response = await vehicleTypeService.update(vehicleTypeUpdate, `${id}`)

        expect(response).toEqual(vehicleType)
    });

    test("deleteTypeVehicle", async () => {
        jest.spyOn(vehicleTypeRepository, "destroy").mockResolvedValueOnce(vehicleType)

        const response = await vehicleTypeService.deleteTypeVehicle(`${id}`)

        expect(response).toEqual(vehicleType)
    });

});