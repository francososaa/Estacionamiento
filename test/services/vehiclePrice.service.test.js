const vehiclePriceRepository = require("../../src/repository/vehiclePrice.repository");
const vehiclePriceService = require("../../src/services/vehiclePrice.service");
const { allVehiclePrice, vehiclePrice } = require("../mock/vehiclePrice");
const { id } = require("../mock/generalMock");
describe("Vehicle Price Service", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    test("create", async () => {
        jest.spyOn(vehiclePriceRepository, "create").mockResolvedValueOnce(vehiclePrice)

        const response = await vehiclePriceService.create(vehiclePrice)

        expect(response).toEqual(vehiclePrice)
    });

    test("getAll", async () => {
        jest.spyOn(vehiclePriceRepository, "getAll").mockResolvedValueOnce(allVehiclePrice)

        const response = await vehiclePriceService.getAll()

        expect(response).toEqual(allVehiclePrice)
    });

    test("update", async () => {
        jest.spyOn(vehiclePriceRepository, "update").mockResolvedValueOnce(vehiclePrice)

        const response = await vehiclePriceService.update(vehiclePrice)

        expect(response).toEqual(vehiclePrice)
    });

    test("findByVehicleType", async () => {
        jest.spyOn(vehiclePriceRepository, "findByPk").mockResolvedValueOnce(vehiclePrice)

        const response = await vehiclePriceService.findByVehicleType(`${id}`)

        expect(response).toEqual(vehiclePrice)
    });

});