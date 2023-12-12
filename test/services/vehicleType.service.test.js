const request = require("supertest");
const app = require("../../app");
const server = require("../../server");
const vehicleTypeRepository = require("../../src/repository/vehicleType.repository");
const { vehicleType, vehicleTypes, vehicleTypeUpdate } = require("../mock/vehicleType");


jest.mock("../../src/repository/vehicleType.repository");

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

describe("Vehicle Type Service", () => {

    test("Create", async () => {

        jest.spyOn(vehicleTypeRepository, "create").mockImplementation(() => vehicleType )

        await request(app)
            .post("/api/v1/vehicleType")
            .set("authentication","123456")
            .expect(201)
            .expect({ message: "Success" })
    });

    test("Get all", async () => {

        jest.spyOn(vehicleTypeRepository, "findAll").mockImplementation(() => vehicleTypes )

        await request(app)
            .get("/api/v1/vehicleType")
            .set("authentication","123456")
            .expect(200)
            .expect({ message: "Success", vehicleType: vehicleTypes })
    });

    test("Find Vehicle Type", async () => {

        jest.spyOn(vehicleTypeRepository, "findOne").mockImplementation(() => vehicleType )
    });

});