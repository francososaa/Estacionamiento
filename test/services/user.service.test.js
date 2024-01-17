const userRepository = require("../../src/repository/user.repository");
const userService = require("../../src/services/user.service");
const { newUser, user } = require("../mock/user");
const { id } = require("../mock/generalMock");

describe("UserService", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    test("create", async () => {
        jest.spyOn(userRepository, "create").mockResolvedValueOnce(user)

        const response = await userService.create(newUser)

        expect(response).toEqual(user)
    });

    test("findOne", async () => {
        jest.spyOn(userRepository, "findOne").mockResolvedValueOnce(user)

        const response = await userService.findOne("franco@gmail.com")

        expect(response).toEqual(user)
    });

    test("findByPk", async () => {
        jest.spyOn(userRepository, "findById").mockResolvedValueOnce(user)

        const response = await userService.findByPk(`${id}`)

        expect(response).toEqual(user)
    });

    test("findByUuid", async () => {
        jest.spyOn(userRepository, "findByUuid").mockResolvedValueOnce(user)

        const response = await userService.findByUuid(`${id}`)

        expect(response).toEqual(user)
    });

});