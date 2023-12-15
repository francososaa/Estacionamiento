const request = require("supertest");
const app = require("../../app");
const server = require("../../server");
const vehicleTypeService = require("../../src/services/vehicleType.service");
const { vehicleType, vehicleTypes, vehicleTypeUpdate } = require("../mock/vehicleType");


jest.mock("../../src/middlewares/validateMiddlewares", () => (
    {
        ...jest.requireActual("../../src/middlewares/validateMiddlewares"),
        validarJWT: jest.fn().mockImplementation((req, res, next) => { next() }),
        checkRoleAdmin: jest.fn().mockImplementation((req, res, next) => { next() })
    }
));

afterAll(() => {
    server.close();
});

describe("Vehicle Type", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe("New", () => {
        test("New vehicle type ", async () => {

            jest.spyOn(vehicleTypeService, "findVehicleType").mockResolvedValueOnce(false)
            jest.spyOn(vehicleTypeService, "create").mockResolvedValueOnce()
    
            await request(app)
                .post("/api/v1/vehicleType")
                .set("authentication","123456")
                .send(vehicleType)
                .expect(201)
                .expect({ message: "Success" })
        });
        
        describe("Failed", () => {
            test("Existe el tipo de vehiculo ", async () => {

                jest.spyOn(vehicleTypeService, "findVehicleType").mockResolvedValueOnce(vehicleType)

                await request(app)
                    .post("/api/v1/vehicleType")
                    .set("authentication","123456")
                    .send(vehicleType)
                    .expect(400)
                    .expect({ message: "Ya existe un vehiculo registrado." })
            });

            test("Error al crear el tipo de vehiculo", async () => {

                jest.spyOn(vehicleTypeService, "findVehicleType").mockResolvedValueOnce(false)
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

            jest.spyOn(vehicleTypeService, "getAll").mockResolvedValueOnce(vehicleTypes)
    
            await request(app)
                .get("/api/v1/vehicleType")
                .set("authentication","123456")
                .expect(200)
                .expect({ message: "Success", vehicleType: vehicleTypes })
        });
    });

    describe("Update", () => { 
        test("Successful Upgrade", async () => {

            jest.spyOn(vehicleTypeService, "findById").mockResolvedValueOnce(vehicleType)
            jest.spyOn(vehicleTypeService, "update").mockResolvedValueOnce()
    
            await request(app)
                .put("/api/v1/vehicleType/1")
                .set("authentication","123456")
                .send(vehicleTypeUpdate)
                .expect(200)
                .expect({ message: "Success" })
        });
    
        test("No existe el tipo de vehiculo", async () => {

            jest.spyOn(vehicleTypeService, "findById").mockResolvedValueOnce(false)
    
            await request(app)
                .put("/api/v1/vehicleType/1")
                .set("authentication","123456")
                .send(vehicleTypeUpdate)
                .expect(404)
                .expect({ message: "No existe el tipo de vehiculo" })
        });
     
    });

    describe("Destroy", () => {
        test("Successful elimination", async () => {

            jest.spyOn(vehicleTypeService, "findById").mockResolvedValueOnce(vehicleType)
            jest.spyOn(vehicleTypeService, "update").mockResolvedValueOnce()
    
            await request(app)
                .delete("/api/v1/vehicleType/1")
                .set("authentication","123456")
                .expect(200)
                .expect({ message: "Success" })
        });
    
        test("No existe el tipo de vehiculo", async () => {

            jest.spyOn(vehicleTypeService, "findById").mockResolvedValueOnce(false)
    
            await request(app)
                .delete("/api/v1/vehicleType/1")
                .set("authentication","123456")
                .expect(404)
                .expect({ message: "Tipo de vehiculo inexistente"  })
        });
    });
});