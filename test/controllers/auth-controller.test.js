const request = require("supertest");
const app = require("../../app");
const server = require("../../server");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = require("../../src/services/user.service");
const helpers = require("../../src/helpers/generar-jwt");
const { register } = require("../mock/auth-controller");
const { user, token } = require("../mock/user");

jest.mock("../../src/helpers/generar-jwt");

jest.mock("../../src/services/email.service", () => (
    {
        ...jest.requireActual("../../src/services/email.service"),
        sendRegistrationEmail: jest.fn()
    }
));

jest.mock("../../src/middlewares/validateMiddlewares", () => (
    {
        ...jest.requireActual("../../src/middlewares/validateMiddlewares"),
        validarJWT: jest.fn().mockImplementation((req, res, next) => { next() })
    }
));

afterAll(() => {
    server.close();
});

afterAll(() => {
    jest.clearAllMocks();
});


describe("Authentication", () => {
    
    describe("Login", () => {
        
        test("Success", async () => {

            jest.spyOn(userService, "findOne").mockResolvedValueOnce(user);
            jest.spyOn(bcryptjs, "compareSync").mockResolvedValueOnce(true);
            jest.spyOn(helpers, "generarJWT").mockResolvedValueOnce(token);
    
            await request(app)
                .post("/api/v1/authenticate/login")
                .set("authentication","123456")
                .send({ "email": "jest@gmail.com", "password": "ejemplo123" })
                .expect(200)
                .expect({ message: "Successfully logged in", user, token })
        });

        describe("Failed", () => {
            test("Falta password", async () => {
   
                await request(app)
                    .post("/api/v1/authenticate/login")
                    .set("authentication","123456")
                    .send({ "email": "jest@gmail.com" })
                    .expect(400)
                    .expect({ message: "Email and password are mandatory" })
            });

            test("El usuario no existe", async () => {
                
                jest.spyOn(userService, "findOne").mockResolvedValueOnce(false);

                await request(app)
                    .post("/api/v1/authenticate/login")
                    .set("authentication","123456")
                    .send({ "email": "jest@gmail.com", "password": "ejemplo123"  })
                    .expect(404)
                    .expect({ message: "User does not exist" })
            });

            test("Error al iniciar sesion", async () => {
                
                jest.spyOn(userService, "findOne").mockResolvedValueOnce(user);
                jest.spyOn(bcryptjs, "compareSync").mockResolvedValueOnce(true);
                jest.spyOn(helpers, "generarJWT").mockRejectedValueOnce("no");

                await request(app)
                    .post("/api/v1/authenticate/login")
                    .set("authentication","123456")
                    .send({ "email": "jest@gmail.com", "password": "ejemplo123" })
                    .expect(500)
                    .expect({ message: "Error al iniciar sesion"  })
            });
        });

    });

    describe("Register", () => {
        test("Success", async () => {

            jest.spyOn(userService, "create").mockResolvedValueOnce(user);

            await request(app)
                .post("/api/v1/authenticate/register")
                .send(register)
                .expect(201)
                .expect({ message:  "Successfully Registered" })
        });

        test("Fallo la registracion", async () => {

            jest.spyOn(userService, "create").mockRejectedValueOnce("no");

            await request(app)
                .post("/api/v1/authenticate/register")
                .send(register)
                .expect(500)
                .expect({  message: "Fallo la registracion" })
        });
    });

    describe("Logout", () => {
        test("Success", async () => {

            await request(app)
                .get("/api/v1/authenticate/logout")
                .set("authentication","123456")
                .expect(200)
                .expect({ message: "You have successfully logged out" })
        });
    
    });
});