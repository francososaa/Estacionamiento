const middlewares = require('../../src/middlewares/validateMiddlewares');
const userService = require('../../src/services/user.service');
const { id } = require('../../test/mock/generalMock');
const { user, token } = require('../../test/mock/user');
const jwt = require("jsonwebtoken");

describe("Middlewares", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe("validarJWT", () => {

        test("Success", async () => {
            
            const res = {};

            let req = {
                header: jest.fn(()=> token)
            };

            const next = jest.fn();

            jest.spyOn(jwt, 'verify').mockReturnValueOnce(id);
            jest.spyOn(userService, 'findByUuid').mockReturnValueOnce(user);

            req.user = user;

            await middlewares.validarJWT(req, res, next);

            expect(req.header).toHaveBeenCalledWith('authentication');
            expect(next).toHaveBeenCalled();
        });
    });


});