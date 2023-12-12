const request = require("supertest");
const app = require("../../app");
const server = require("../../server");
const vehicleTypeService = require("../../src/services/vehicleType.service");
const { vehicleType, vehicleTypes, vehicleTypeUpdate } = require("../mock/vehicleType");


jest.mock("../../src/services/vehicleType.service");

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

describe("Vehicle Type", () => {

    describe("New", () => {
        describe("Success", () => {
            test("New vehicle type ", async () => {

                jest.spyOn(vehicleTypeService, "findVehicleType").mockImplementation(() => false )

                jest.spyOn(vehicleTypeService, "create").mockImplementation()
        
                await request(app)
                    .post("/api/v1/vehicleType")
                    .set("authentication","123456")
                    .send(vehicleType)
                    .expect(201)
                    .expect({ message: "Success" })
            });
        });

        describe("Failed", () => {
            test("Existe el tipo de vehiculo ", async () => {

                jest.spyOn(vehicleTypeService, "findVehicleType").mockImplementation(() => vehicleType )

                await request(app)
                    .post("/api/v1/vehicleType")
                    .set("authentication","123456")
                    .send(vehicleType)
                    .expect(400)
                    .expect({ message: "Ya existe un vehiculo registrado." })
            });

            test("Error al crear el tipo de vehiculo", async () => {

                jest.spyOn(vehicleTypeService, "findVehicleType").mockImplementation(() => false )

                jest.spyOn(vehicleTypeService, "create").mockRejectedValue()

                await request(app)
                    .post("/api/v1/vehicleType")
                    .set("authentication","123456")
                    .send(vehicleType)
                    .expect(500)
                    .expect({ message: "Error al crear el tipo de vehiculo"  })
            });
        });
    });

    describe("Get All", () => {
        test("Get all vehicle type", async () => {

            jest.spyOn(vehicleTypeService, "getAll").mockImplementation(() => vehicleTypes )
    
            await request(app)
                .get("/api/v1/vehicleType")
                .set("authentication","123456")
                .expect(200)
                .expect({ message: "Success", vehicleType: vehicleTypes })
        });
    });

    describe("Update", () => {
        describe("Success", () => {
            test("Successful Upgrade", async () => {

                jest.spyOn(vehicleTypeService, "findById").mockImplementation(() => vehicleType )

                jest.spyOn(vehicleTypeService, "update").mockImplementation()
        
                await request(app)
                    .put("/api/v1/vehicleType/1")
                    .set("authentication","123456")
                    .send(vehicleTypeUpdate)
                    .expect(200)
                    .expect({ message: "Success" })
            });
        });

        describe("Failed", () => {
            test("No existe el tipo de vehiculo", async () => {

                jest.spyOn(vehicleTypeService, "findById").mockImplementation(() => false )
        
                await request(app)
                    .put("/api/v1/vehicleType/1")
                    .set("authentication","123456")
                    .send(vehicleTypeUpdate)
                    .expect(404)
                    .expect({ message: "No existe el tipo de vehiculo" })
            });
        });
    });

    describe("Destroy", () => {
        describe("Success", () => {
            test("Successful elimination", async () => {

                jest.spyOn(vehicleTypeService, "findById").mockImplementation(() => vehicleType )

                jest.spyOn(vehicleTypeService, "update").mockImplementation()
        
                await request(app)
                    .delete("/api/v1/vehicleType/1")
                    .set("authentication","123456")
                    .expect(200)
                    .expect({ message: "Success" })
            });
        });

        describe("Failed", () => {
            test("No existe el tipo de vehiculo", async () => {

                jest.spyOn(vehicleTypeService, "findById").mockImplementation(() => false )
        
                await request(app)
                    .delete("/api/v1/vehicleType/1")
                    .set("authentication","123456")
                    .expect(404)
                    .expect({ message: "Tipo de vehiculo inexistente"  })
            });
        });
    });

});