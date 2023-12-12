const request = require("supertest");
const app = require("../../app");
const server = require("../../server");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = require("../../src/services/user.service");
const generarToken = require("../../src/helpers/generar-jwt");
const { register } = require("../mock/auth-controller");
const { user } = require("../mock/user");

jest.mock("../../src/controllers/auth-controller");
jest.mock("../../src/services/user.service");
jest.mock("../../src/helpers/generar-jwt");

jest.mock("../../src/middlewares/validateMiddlewares", () => (
    {
        ...jest.requireActual("../../src/middlewares/validateMiddlewares"),
        validarJWT: jest.fn().mockImplementation((req, res, next) => { next() })
    }
));

afterAll(() => {
    jest.clearAllMocks();
    server.close();
});

describe("Authentication", () => {
    describe("Login", () => {
        describe("Success", () => {
            test("Success", async () => {

                jest.spyOn(userService, "findOne").mockImplementation(() => user )
                
                jest.spyOn(bcryptjs, "compareSync").mockImplementation(() => true )
    
                jest.spyOn(generarToken, "generarJWT").mockImplementation(() => token )

                await request(app)
                    .post("/api/v1/authenticate/login")
                    .set("authentication","123456")
                    .send(newUser)
                    .expect(200)
                    .expect({ message: "Successfully logged in", user, token })
            });
        });

        describe("Failed", () => {
            test("Campos faltantes", async () => {

                await request(app)
                    .post("/api/v1/authenticate/login")
                    .set("authentication","123456")
                    .send({ "email": "test@gmail.com" })
                    .expect(400)
                    .expect({ message: "Email and password are mandatory" })
            });

            test("El usuario no existe", async () => {

                jest.spyOn(userService, "findOne").mockImplementation(() => false )
                
                await request(app)
                    .post("/api/v1/authenticate/login")
                    .set("authentication","123456")
                    .send(newUser)
                    .expect(404)
                    .expect({ message: "User does not exist" })
            });

            test("Password incorrecto", async () => {

                jest.spyOn(userService, "findOne").mockImplementation(() => user )
                
                jest.spyOn(bcryptjs, "compareSync").mockImplementation(() => false )

                await request(app)
                    .post("/api/v1/authenticate/login")
                    .set("authentication","123456")
                    .send(newUser)
                    .expect(400)
                    .expect({ message: "Password is incorrect" })
            });

            test("Error al iniciar sesion" , async () => {

                jest.spyOn(userService, "findOne").mockImplementation(() => user )
                
                jest.spyOn(bcryptjs, "compareSync").mockImplementation(() => true )
    
                jest.spyOn(generarToken, "generarJWT").mockRejectedValue()

                await request(app)
                    .post("/api/v1/authenticate/login")
                    .set("authentication","123456")
                    .send(newUser)
                    .expect(500)
                    .expect({ message: "Error al iniciar sesion" })
            });
        });
        
    });

    describe("Logout", () => {
        describe("Success", () => {
            test("Success", async () => {  

                jest.spyOn(jwt, "sign").mockImplementation(() => true )

                await request(app)
                    .get("/api/v1/authenticate/logout")
                    .set("authentication","12345")
                    .expect(200)
                    .expect({ message: "You have successfully logged out" })
            });
        });

        describe("Failed", () => {
            test("No hay token", async () => {  

                await request(app)
                    .get("/api/v1/authenticate/logout")
                    .expect(204)
                    .expect({ message: "No se envio el token" })
            });

            test("Error en logout" , async () => {  

                jest.spyOn(jwt, "sign").mockImplementation(() => false )
                  
                await request(app)
                    .get("/api/v1/authenticate/logout")
                    .set("authentication","12345")
                    .expect(400)
                    .expect({ message: "Error in logout" })
            });
        });

    });

    describe("Register", () => {
        describe("Success", () => {
            describe("Success", () => {
                test("Success", async () => {  
    
                    jest.spyOn(userService, "create").mockImplementation(() => user )
    
                    await request(app)
                        .post("/api/v1/authenticate/register")
                        .send(register)
                        .expect(201)
                        .expect({ message: "Successfully Registered" })
                });
            });

            describe("Failed", () => {
                test("Faltan datos de entrada", async () => {  
    
                    await request(app)
                        .post("/api/v1/authenticate/register")
                        .send({ "firstname": "franco" })
                        .expect(400)
                        .expect({ message: "All data is required" })
                });

                test("Faltan datos de entrada", async () => {  
                    
                    jest.spyOn(userService, "create").mockRejectedValue()

                    await request(app)
                        .post("/api/v1/authenticate/register")
                        .send(register)
                        .expect(500)
                        .expect({ message: "Fallo la registracion" })
                });
            });
        });
    });
});

