const request = require("supertest");
const app = require("../../app");
const server = require("../../server");
const collectionService = require("../../src/services/collection.service");
const { recaudacionByDate, recaudacionByDateTotal, recaudations  } = require("../mock/collection");

jest.mock("../../src/services/collection.service");

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

describe("Collection", () => {
    test("Get all recaudations ", async () => {

        jest.spyOn(collectionService, "getAll").mockImplementation(() => recaudations )

        await request(app)
            .get("/api/v1/collection")
            .set("authentication","123456")
            .expect(200)
            .expect({ message: "Success", recaudations })
    });
    
    test("Get recaudation by date ", async() => {

        jest.spyOn(collectionService, "getRecaudationByDate").mockImplementation(() => recaudacionByDate )

        await request(app)
        .get("/api/v1/collection/date/2023-12-07")
        .set("authentication","123456")
        .expect(200)
        .expect({ message: "Success", recaudation: recaudacionByDate })
    });
    
    test("Get recaudation by date total ", async() => {

        jest.spyOn(collectionService, "getRecaudationTotalByDate").mockImplementation(() => recaudacionByDateTotal )

        await request(app)
        .get("/api/v1/collection/date/2023-12-07/total")
        .set("authentication","123456")
        .expect(200)
        .expect({ message: "Success", recaudation: recaudacionByDateTotal })
    });
});