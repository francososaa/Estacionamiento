const request = require("supertest");
const app = require("../../app");
const server = require("../../server");
const collectionService = require("../../src/services/collection.service");
const { recaudacionByDate, recaudacionByDateTotal, recaudations  } = require("../mock/collection");

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

describe("Collection", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });
    
    test("Get all recaudations ", async () => {

        jest.spyOn(collectionService, "getAll").mockResolvedValueOnce(recaudations)

        await request(app)
            .get("/api/v1/collection")
            .set("authentication","123456")
            .expect(200)
            .expect({ message: "Success", recaudations })
    });
    
    test("Get recaudation by date ", async() => {

        jest.spyOn(collectionService, "getRecaudationByDate").mockResolvedValueOnce(recaudacionByDate)

        await request(app)
        .get("/api/v1/collection/date/2023-12-07")
        .set("authentication","123456")
        .expect(200)
        .expect({ message: "Success", recaudation: recaudacionByDate })
    });
    
    test("Get recaudation by date total ", async() => {

        jest.spyOn(collectionService, "getRecaudationTotalByDate").mockResolvedValueOnce(recaudacionByDateTotal)

        await request(app)
        .get("/api/v1/collection/date/2023-12-07/total")
        .set("authentication","123456")
        .expect(200)
        .expect({ message: "Success", recaudation: recaudacionByDateTotal })
    });
});