const request = require("supertest");
const app = require("../../app");
const server = require("../../server");
const buildingCapacityService = require("../../src/services/building_capacity.service");
const { buildingCapacity, newCapacity, capacity } = require("../mock/building_capacity");
const { date, id } = require("../mock/generalMock");

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

describe("Building Capacity", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe("New", () => {
        test("Creacion de la capacidad", async () => {

            jest.spyOn(buildingCapacityService, "validaDateAndType").mockResolvedValueOnce(false)  
            jest.spyOn(buildingCapacityService, "create").mockResolvedValueOnce(buildingCapacity)
    
            await request(app)
                .post("/api/v1/building_capacity")
                .set("authentication","123456")
                .send(newCapacity)
                .expect(201)
                .expect({ message: "Success", buildingCapacity })
        });

        describe("Failed", () => {
            test("Ya existe la capacidad", async () => {

                jest.spyOn(buildingCapacityService, "validaDateAndType").mockResolvedValueOnce(true)
            
                await request(app)
                    .post("/api/v1/building_capacity")
                    .set("authentication","123456")
                    .send(newCapacity)
                    .expect(400)
                    .expect({ message: "Ya existe la capacidad para esa fecha y vehiculo"})
            });
        });
    });

    describe("Get building capacity", () => {
        test("Obtener la capacidad", async () => {

            jest.spyOn(buildingCapacityService, "getAll").mockResolvedValueOnce(capacity)
    
            await request(app)
                .get("/api/v1/building_capacity")
                .set("authentication","123456")
                .expect(200)
                .expect({ message: "Success", capacity })
        });
    });

    describe("Update", () => {
        
        test("Actualizacion de la capacidad", async () => {

            jest.spyOn(buildingCapacityService, "validaDateAndType").mockResolvedValueOnce(true)         
            jest.spyOn(buildingCapacityService, "updateOverallCapacityForDateAndTypeVehicle").mockResolvedValueOnce(true)
    
            await request(app)
                .put(`/api/v1/building_capacity/date/${date}/vehicle/${id}`)
                .set("authentication","123456")
                .expect(200)
                .expect({ message: "Success" })
        });

        test("No se encuentra fecha o tipo de vehiculo", async () => {

            jest.spyOn(buildingCapacityService, "validaDateAndType").mockResolvedValueOnce(false)

            await request(app)
                .put(`/api/v1/building_capacity/date/${date}/vehicle/${id}`)
                .set("authentication","123456")
                .expect(400)
                .expect({ message: "No se encuentra fecha o tipo de vehiculo" })
        });
        
    });

    describe("Destroy", () => {
        
        test("Eliminacion de la capacidad", async () => {

            jest.spyOn(buildingCapacityService, "validaDateAndType").mockResolvedValueOnce(true)     
            jest.spyOn(buildingCapacityService, "destroyForDateAndVehicleType").mockResolvedValueOnce(true)
    
            await request(app)
                .delete(`/api/v1/building_capacity/date/${date}/vehicle/${id}`)
                .set("authentication","123456")
                .expect(200)
                .expect({ message: "Success" })
        });
     
        test("No se encuentra fecha o tipo de vehiculo", async () => {

            jest.spyOn(buildingCapacityService, "validaDateAndType").mockResolvedValueOnce(false)

            await request(app)
                .delete(`/api/v1/building_capacity/date/${date}/vehicle/${id}`)
                .set("authentication","123456")
                .expect(400)
                .expect({ message: "No se encuentra fecha o tipo de vehiculo" })
        });
    });
});