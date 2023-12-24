const request = require("supertest");
const app = require("../../app");
const server = require("../../server");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = require("../../src/services/user.service");
const generarToken = require("../../src/helpers/generar-jwt");
const { register } = require("../mock/auth-controller");
const { user, newUser, token } = require("../mock/user");

jest.mock("../../src/middlewares/validateMiddlewares2", () => (
    {
        ...jest.requireActual("../../src/middlewares/validateMiddlewares2"),
        validarJWT: jest.fn().mockImplementation((req, res, next) => { next() })
    }
));

jest.mock("../../src/services/email.service", () => (
    {
        ...jest.requireActual("../../src/services/email.service"),
        sendRegistrationEmail: jest.fn()
    }
));

afterAll(() => {
    server.close();
});

describe("Authentication", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe("Login", () => {
        test("Success", async () => {

            jest.spyOn(userService, "findOne").mockResolvedValueOnce(user)         
            jest.spyOn(bcryptjs, "compareSync").mockResolvedValueOnce(true)
            jest.spyOn(generarToken, "generarJWT").mockImplementation(() => token)

            await request(app)
                .post("/api/v1/authenticate/login")
                .set("authentication","123456")
                .send(newUser)
                .expect(200)
                .expect({ message: "Successfully logged in", user, token })
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

                jest.spyOn(userService, "findOne").mockResolvedValueOnce(false)
                
                await request(app)
                    .post("/api/v1/authenticate/login")
                    .set("authentication","123456")
                    .send(newUser)
                    .expect(404)
                    .expect({ message: "User does not exist" })
            });

            test("Password incorrecto", async () => {

                jest.spyOn(userService, "findOne").mockResolvedValueOnce(user)
                jest.spyOn(bcryptjs, "compareSync").mockResolvedValueOnce(false)

                await request(app)
                    .post("/api/v1/authenticate/login")
                    .set("authentication","123456")
                    .send(newUser)
                    .expect(400)
                    .expect({ message: "Password is incorrect" })
            });

            test("Error al iniciar sesion" , async () => {

                jest.spyOn(userService, "findOne").mockImplementation(user)                
                jest.spyOn(bcryptjs, "compareSync").mockImplementation(true)   
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
     
        test("Success", async () => {  

            jest.spyOn(jwt, "sign").mockResolvedValueOnce(true)

            await request(app)
                .get("/api/v1/authenticate/logout")
                .set("authentication","12345")
                .expect(200)
                .expect({ message: "You have successfully logged out" })
        });

        describe("Failed", () => {
            test("No hay token", async () => {  

                await request(app)
                    .get("/api/v1/authenticate/logout")
                    .expect(204)
                    .expect({ message: "No se envio el token" })
            });

            test("Error en logout" , async () => {  

                jest.spyOn(jwt, "sign").mockResolvedValueOnce(false)
                  
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
            
            test("Success", async () => {  

                jest.spyOn(userService, "create").mockResolvedValueOnce(user)
                jest.spyOn(bcryptjs, "genSaltSync").mockResolvedValueOnce("password")
                jest.spyOn(bcryptjs, "hashSync").mockResolvedValueOnce(token)

                await request(app)
                    .post("/api/v1/authenticate/register")
                    .send(register)
                    .expect(201)
                    .expect({ message: "Successfully Registered" })
            });
         
            describe("Failed", () => {
                test("Faltan datos de entrada", async () => {  
    
                    await request(app)
                        .post("/api/v1/authenticate/register")
                        .send({ "firstname": "franco" })
                        .expect(400)
                        .expect({ message: "All data is required" })
                });

                test("Fallo la registracion", async () => {  
                    
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
