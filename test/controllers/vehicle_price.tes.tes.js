const request = require("supertest");
const app = require("../../app");
const server = require("../../server");
const vehiclePriceService = require("../../src/services/vehiclePrice.service");
const { allVehiclePrice ,vehiclePrice } = require("../mock/vehiclePrice");

jest.mock("../../src/middlewares/validateMiddlewares", () => (
    {
        ...jest.requireActual("../../src/middlewares/validateMiddlewares"),
        validarJWT: jest.fn().mockImplementation((req, res, next) => { next() }),
        checkRoleAdmin: jest.fn().mockResolvedValueOnce((req, res, next) => { next() })
    }
));

afterAll(() => {
    server.close();
});

describe("Vehicle Price", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });
    
    describe("New", () => {
        test("New vehicle price ", async () => {

            jest.spyOn(vehiclePriceService, "findByVehicleType").mockResolvedValueOnce(false)
            jest.spyOn(vehiclePriceService, "create").mockResolvedValueOnce()
    
            await request(app)
                .post("/api/v1/vehiclePrice")
                .set("authentication","123456")
                .send(vehiclePrice)
                .expect(201)
                .expect({ message: "Success" })
        });

        describe("Failed", () => {
            test("Existe el precio para ese tipo de vehiculo ", async () => {

                jest.spyOn(vehiclePriceService, "findByVehicleType").mockResolvedValueOnce(vehiclePrice)

                await request(app)
                    .post("/api/v1/vehiclePrice")
                    .set("authentication","123456")
                    .send(vehiclePrice)
                    .expect(400)
                    .expect({ message: "Ya existe el precio para ese tipo de vehiculo" })
            });

            test("Error al crear el precio del vehiculo", async () => {

                jest.spyOn(vehiclePriceService, "findByVehicleType").mockResolvedValueOnce(false)
                jest.spyOn(vehiclePriceService, "create").mockRejectedValue()

                await request(app)
                    .post("/api/v1/vehiclePrice")
                    .set("authentication","123456")
                    .send(vehiclePrice)
                    .expect(500)
                    .expect({ message: "No se pudo crear el precio" })
            });
        });
    });

    describe("Get All", () => {
        test("Get all vehicle price", async () => {

            jest.spyOn(vehiclePriceService, "getAll").mockResolvedValueOnce(allVehiclePrice)
    
            await request(app)
                .get("/api/v1/vehiclePrice")
                .set("authentication","123456")
                .expect(200)
                .expect({ message: "Success", vehiclePrice: allVehiclePrice })
        });
    });

    describe("Update", () => {
        test("Successful Upgrade", async () => {

            jest.spyOn(vehiclePriceService, "findByVehicleType").mockResolvedValueOnce(vehiclePrice)
            jest.spyOn(vehiclePriceService, "update").mockResolvedValueOnce()
    
            await request(app)
                .put("/api/v1/vehiclePrice")
                .set("authentication","123456")
                .send(vehiclePrice)
                .expect(200)
                .expect({ message: "Success" })
        });
    
        test("No existe el precio del vehiculo", async () => {

            jest.spyOn(vehiclePriceService, "findByVehicleType").mockResolvedValueOnce(false)
    
            await request(app)
                .put("/api/v1/vehiclePrice")
                .set("authentication","123456")
                .send(vehiclePrice)
                .expect(404)
                .expect({ message: "No existe el tipo de vehiculo" })
        });
    });
});