const request = require("supertest");
const app = require("../../app");
const server = require("../../server");
const vehiclePriceService = require("../../src/services/vehiclePrice.service");
const { allVehiclePrice ,vehiclePrice } = require("../mock/vehiclePrice");

jest.mock("../../src/services/vehiclePrice.service");

jest.mock("../../src/utils/logger", () => (
    {
        ...jest.requireActual("../../src/utils/logger"),
        logger: {
            info: jest.fn(),
            debug: jest.fn()
        }
    }
));

jest.mock("winston", () => (
    {
        ...jest.requireActual("winston"),
        createLogger: jest.fn().mockImplementation(() => ({ debug: jest.fn(), info: jest.fn() }))
    }
));

jest.mock("../../src/middlewares/validateMiddlewares", () => (
    {
        ...jest.requireActual("../../src/middlewares/validateMiddlewares"),
        validarJWT: jest.fn().mockImplementation((req, res, next) => { next() }),
        checkRoleAdmin: jest.fn().mockImplementation((req, res, next) => { next() })
    }
));

afterAll(() => {
    server.close();
    jest.clearAllMocks();
});

describe("Vehicle Price", () => {
    describe("New", () => {
        describe("Success", () => {
            test("New vehicle price ", async () => {

                jest.spyOn(vehiclePriceService, "findByVehicleType").mockImplementation(() => false )

                jest.spyOn(vehiclePriceService, "create").mockImplementation()
        
                await request(app)
                    .post("/api/v1/vehiclePrice")
                    .set("authentication","123456")
                    .send(vehiclePrice)
                    .expect(201)
                    .expect({ message: "Success" })
            });
        });

        describe("Failed", () => {
            test("Existe el precio para ese tipo de vehiculo ", async () => {

                jest.spyOn(vehiclePriceService, "findByVehicleType").mockImplementation(() => vehiclePrice )

                await request(app)
                    .post("/api/v1/vehiclePrice")
                    .set("authentication","123456")
                    .send(vehiclePrice)
                    .expect(400)
                    .expect({ message: "Ya existe el precio para ese tipo de vehiculo" })
            });

            test("Error al crear el precio del vehiculo", async () => {

                jest.spyOn(vehiclePriceService, "findByVehicleType").mockImplementation(() => false )

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

            jest.spyOn(vehiclePriceService, "getAll").mockImplementation(() => allVehiclePrice )
    
            await request(app)
                .get("/api/v1/vehiclePrice")
                .set("authentication","123456")
                .expect(200)
                .expect({ message: "Success", vehiclePrice: allVehiclePrice })
        });
    });

    describe("Update", () => {
        describe("Success", () => {
            test("Successful Upgrade", async () => {

                jest.spyOn(vehiclePriceService, "findByVehicleType").mockImplementation(() => vehiclePrice )

                jest.spyOn(vehiclePriceService, "update").mockImplementation()
        
                await request(app)
                    .put("/api/v1/vehiclePrice")
                    .set("authentication","123456")
                    .send(vehiclePrice)
                    .expect(200)
                    .expect({ message: "Success" })
            });
        });

        describe("Failed", () => {
            test("No existe el precio del vehiculo", async () => {

                jest.spyOn(vehiclePriceService, "findByVehicleType").mockImplementation(() => false )
        
                await request(app)
                    .put("/api/v1/vehiclePrice")
                    .set("authentication","123456")
                    .send(vehiclePrice)
                    .expect(404)
                    .expect({ message: "No existe el tipo de vehiculo" })
            });
        });
    });

});