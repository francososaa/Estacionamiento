const request = require("supertest");
const app = require("../../app");
const server = require("../../server");
const vehicleService = require("../../src/services/vehicle.service");
const { allVehicles, newVehicle, vehicle } = require("../mock/vehicle");

jest.mock("../../src/services/vehicle.service");

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
        checkRoleUser: jest.fn().mockImplementation((req, res, next) => { next() })
    }
));

afterAll(() => {
    server.close();
    jest.clearAllMocks();
});

describe("Vehicle", () => {
    describe("New", () => {
        describe("Success", () => {
            test("New vehicle  ", async () => {

                jest.spyOn(vehicleService, "findVehicleByLicense").mockImplementation(() => false )

                jest.spyOn(vehicleService, "create").mockImplementation()
        
                await request(app)
                    .post("/api/v1/vehicle")
                    .set("authentication","123456")
                    .send(newVehicle)
                    .expect(201)
                    .expect({ message: "Success" })
            });
        });

        describe("Failed", () => {
            test("Existe el vehiculo ", async () => {

                jest.spyOn(vehicleService, "findVehicleByLicense").mockImplementation(() => vehicle )

                await request(app)
                    .post("/api/v1/vehicle")
                    .set("authentication","123456")
                    .send(newVehicle)
                    .expect(400)
                    .expect({ message: "Ya existe un vehiculo registrado con esa patente" })
            });

            test("Error al crear el vehiculo", async () => {

                jest.spyOn(vehicleService, "findVehicleByLicense").mockImplementation(() => false )

                jest.spyOn(vehicleService, "create").mockRejectedValue()
        
                await request(app)
                    .post("/api/v1/vehicle")
                    .set("authentication","123456")
                    .send(newVehicle)
                    .expect(500)
                    .expect({  message: "Error al crear el vehiculo" })
            });
        });
    });

    describe("Get all vehicle", () => {
        test("Obtener todos los vehiculos ", async () => {

            jest.spyOn(vehicleService, "allVehicles").mockImplementation(() => allVehicles )

            await request(app)
                .get("/api/v1/vehicle/12345")
                .set("authentication","123456")
                .expect(200)
                .expect({ message: "Success", vehicles: allVehicles })
        });
    });

    describe("Get vehicle by license", () => {
        test("Obtener vehiculo por patente ", async () => {

            jest.spyOn(vehicleService, "findVehicleByLicense").mockImplementation(() => vehicle )

            await request(app)
                .get("/api/v1/vehicle/12345/license/OTC015")
                .set("authentication","123456")
                .expect(200)
                .expect({ message: "Success", vehicle })
        });
    });

    describe("Find by id", () => {
        test("Obtener vehiculo por id ", async () => {

            jest.spyOn(vehicleService, "findVehicleById").mockImplementation(() => vehicle )

            await request(app)
                .get("/api/v1/vehicle/12345/1")
                .set("authentication","123456")
                .expect(200)
                .expect({ message: "Success", vehicle })
        });
    });

    describe("Update", () => {
        describe("Success", () => {
            test("Actualizacion del vehiculo", async () => {

                jest.spyOn(vehicleService, "findVehicleById").mockImplementation(() => vehicle )
                
                jest.spyOn(vehicleService, "updateById").mockImplementation(() => vehicle )
                
                await request(app)
                    .put("/api/v1/vehicle/12345/1")
                    .set("authentication","123456")
                    .send(newVehicle)
                    .expect(200)
                    .expect({ message: "Success" })
            });
        });

        describe("Failed", () => {
            test("No existe el vehiculo ", async () => {

                jest.spyOn(vehicleService, "findVehicleById").mockImplementation(() => false )
                
                await request(app)
                    .put("/api/v1/vehicle/12345/1")
                    .set("authentication","123456")
                    .send(newVehicle)
                    .expect(404)
                    .expect({ message: "Vehiculo inexistente" })
            });
        });
        
    });

    describe("Cancel", () => {
        describe("Success", () => {
            test("Eliminacion del vehiculo", async () => {

                jest.spyOn(vehicleService, "findVehicleById").mockImplementation(() => vehicle )
                
                jest.spyOn(vehicleService, "cancelVehicle").mockImplementation(() => true )
                
                await request(app)
                    .put("/api/v1/vehicle/12345/cancelled/1")
                    .set("authentication","123456")
                    .expect(200)
                    .expect({ message: "Success" })
            });
        });

        describe("Failed", () => {
            test("No existe el vehiculo ", async () => {

                jest.spyOn(vehicleService, "findVehicleById").mockImplementation(() => false )
                
                await request(app)
                    .put("/api/v1/vehicle/12345/cancelled/1")
                    .set("authentication","123456")
                    .expect(404)
                    .expect({ message: "Vehiculo inexistente" })
            });
        });
        
    });

});