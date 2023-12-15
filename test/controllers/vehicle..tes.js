const request = require("supertest");
const app = require("../../app");
const server = require("../../server");
const vehicleService = require("../../src/services/vehicle.service");
const { allVehicles, newVehicle, vehicle } = require("../mock/vehicle");

jest.mock("../../src/middlewares/validateMiddlewares", () => (
    {
        ...jest.requireActual("../../src/middlewares/validateMiddlewares"),
        validarJWT: jest.fn().mockImplementation((req, res, next) => { next() }),
        checkRoleUser: jest.fn().mockImplementation((req, res, next) => { next() })
    }
));

beforeAll(() => {
    server.close();
});

afterAll(() => {
    jest.clearAllMocks();
});

describe("Vehicle", () => {    

    beforeEach(() => {
        server.close();
    });
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("New", () => {
    
        test("New vehicle  ", async () => {

            jest.spyOn(vehicleService, "findVehicleByLicense").mockResolvedValueOnce(false)
            jest.spyOn(vehicleService, "create").mockResolvedValueOnce(vehicle)
    
            await request(app)
                .post("/api/v1/vehicle")
                .set("authentication","123456")
                .send(newVehicle)
                .expect(201)
                .expect({ message: "Success" })
        });
   

        describe("Failed", () => {
            test("Existe el vehiculo ", async () => {

                jest.spyOn(vehicleService, "findVehicleByLicense").mockResolvedValueOnce(vehicle)

                await request(app)
                    .post("/api/v1/vehicle")
                    .set("authentication","123456")
                    .send(newVehicle)
                    .expect(400)
                    .expect({ message: "Ya existe un vehiculo registrado con esa patente" })
            });

            test("Error al crear el vehiculo", async () => {

                jest.spyOn(vehicleService, "findVehicleByLicense").mockResolvedValueOnce(false)
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

            jest.spyOn(vehicleService, "allVehicles").mockResolvedValueOnce(allVehicles)

            await request(app)
                .get("/api/v1/vehicle/12345")
                .set("authentication","123456")
                .expect(200)
                .expect({ message: "Success", vehicles: allVehicles })
        });
    });

    describe("Get vehicle by license", () => {
        test("Obtener vehiculo por patente ", async () => {

            jest.spyOn(vehicleService, "findVehicleByLicense").mockResolvedValueOnce(vehicle)

            await request(app)
                .get("/api/v1/vehicle/12345/license/OTC015")
                .set("authentication","123456")
                .expect(200)
                .expect({ message: "Success", vehicle })
        });
    });

    describe("Find by id", () => {
        test("Obtener vehiculo por id ", async () => {

            jest.spyOn(vehicleService, "findVehicleById").mockResolvedValueOnce(vehicle)

            await request(app)
                .get("/api/v1/vehicle/12345/1")
                .set("authentication","123456")
                .expect(200)
                .expect({ message: "Success", vehicle })
        });
    });

    describe("Update", () => {
       
        test("Actualizacion del vehiculo", async () => {

            jest.spyOn(vehicleService, "findVehicleById").mockResolvedValueOnce(vehicle)         
            jest.spyOn(vehicleService, "updateById").mockResolvedValueOnce(vehicle)
            
            await request(app)
                .put("/api/v1/vehicle/12345/1")
                .set("authentication","123456")
                .send(newVehicle)
                .expect(200)
                .expect({ message: "Success" })
        });
     
        test("No existe el vehiculo ", async () => {

            jest.spyOn(vehicleService, "findVehicleById").mockResolvedValueOnce(false)
            
            await request(app)
                .put("/api/v1/vehicle/12345/1")
                .set("authentication","123456")
                .send(newVehicle)
                .expect(404)
                .expect({ message: "Vehiculo inexistente" })
        });    
    });

    describe("Cancel", () => {
        test("Eliminacion del vehiculo", async () => {

            jest.spyOn(vehicleService, "findVehicleById").mockResolvedValueOnce(vehicle)         
            jest.spyOn(vehicleService, "cancelVehicle").mockResolvedValueOnce(true)
            
            await request(app)
                .put("/api/v1/vehicle/12345/cancelled/1")
                .set("authentication","123456")
                .expect(200)
                .expect({ message: "Success" })
        });
    

        test("No existe el vehiculo ", async () => {

            jest.spyOn(vehicleService, "findVehicleById").mockResolvedValueOnce(false)
            
            await request(app)
                .put("/api/v1/vehicle/12345/cancelled/1")
                .set("authentication","123456")
                .expect(404)
                .expect({ message: "Vehiculo inexistente" })
        });
    });
});