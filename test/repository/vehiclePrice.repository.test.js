const vehiclePriceRepository = require("../../src/repository/vehiclePrice.repository");
const { db } = require("../../src/models");
const { allVehiclePrice, vehiclePrice } = require("../mock/vehiclePrice");

describe("Vehicle Price Repository", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    test("create", async () => {
        jest.spyOn(db.vehicle_price, "create").mockResolvedValueOnce(vehiclePrice)

        const response = await vehiclePriceRepository.create(vehiclePrice)

        expect(response).toEqual(vehiclePrice)
    });

    test("getAll", async () => {
        jest.spyOn(db.vehicle_price, "findAll").mockResolvedValueOnce(allVehiclePrice)

        const response = await vehiclePriceRepository.getAll()

        expect(response).toEqual(allVehiclePrice)
    });

    test("update", async () => {
        jest.spyOn(db.vehicle_price, "update").mockResolvedValueOnce(true)

        const response = await vehiclePriceRepository.update(vehiclePrice)

        expect(response).toEqual(true)
    });

    test("findByPk", async () => {
        jest.spyOn(db.vehicle_price, "findOne").mockResolvedValueOnce(vehiclePrice)

        const response = await vehiclePriceRepository.findByPk(1)

        expect(response).toEqual(vehiclePrice)
    });
});