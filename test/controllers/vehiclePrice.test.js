const request = require("supertest");
const app = require("../../app");
const server = require("../../server");
const vehiclePriceService = require("../../src/services/vehiclePrice.service");
const { allVehiclePrice, vehiclePrice } = require("../mock/vehiclePrice");

jest.mock("../../src/middlewares/validateMiddlewares", () => (
    {
        ...jest.requireActual("../../src/middlewares/validateMiddlewares"),
        validarJWT: jest.fn().mockImplementation((req, res, next) => { next() }),
        checkRoleAdmin: jest.fn().mockImplementation((req, res, next) => { next() })
    }
));

beforeAll(() => {
    server.close();
});

afterAll(() => {
    jest.clearAllMocks();
});

describe("Vehicle Price", () => {    

    describe("New", () => {
    
        test("New vehicle Price  ", async () => {

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

            test("Ya existe el precio", async () => {

                jest.spyOn(vehiclePriceService, "findByVehicleType").mockResolvedValueOnce(vehiclePrice)
        
                await request(app)
                    .post("/api/v1/vehiclePrice")
                    .set("authentication","123456")
                    .send(vehiclePrice)
                    .expect(400)
                    .expect({ message: "Ya existe el precio para ese tipo de vehiculo"  })
            });
            
            test("Fallo la creacion", async () => {
    
                jest.spyOn(vehiclePriceService, "findByVehicleType").mockResolvedValueOnce(false)
                jest.spyOn(vehiclePriceService, "create").mockRejectedValue("nop")
    
                await request(app)
                    .post("/api/v1/vehiclePrice")
                    .set("authentication","123456")
                    .send(vehiclePrice)
                    .expect(500)
                    .expect({ message: "No se pudo crear el precio"  })
            });
        });
        

    });

    describe("GetAll", () => {
        test("Obtener todos los precios de los vehiculos", async () => {

            jest.spyOn(vehiclePriceService, "getAll").mockResolvedValueOnce(allVehiclePrice)
    
            await request(app)
                .get("/api/v1/vehiclePrice")
                .set("authentication","123456")
                .send()
                .expect(200)
                .expect({ message: "Success", vehiclePrice: allVehiclePrice })
        });
    });

    describe("Update", () => {
        test("Actualizar el precio del vehiculo", async () => {

            jest.spyOn(vehiclePriceService, "findByVehicleType").mockResolvedValueOnce(vehiclePrice)

            jest.spyOn(vehiclePriceService, "update").mockResolvedValueOnce(true)
    
            await request(app)
                .put("/api/v1/vehiclePrice")
                .set("authentication","123456")
                .send()
                .expect(200)
                .expect({ message: "Success" })
        });

        test("No existe el precio del vehiculo", async () => {

            jest.spyOn(vehiclePriceService, "findByVehicleType").mockResolvedValueOnce(false)
    
            await request(app)
                .put("/api/v1/vehiclePrice")
                .set("authentication","123456")
                .send()
                .expect(404)
                .expect({ message: "No existe el tipo de vehiculo"  })
        });
    });
});