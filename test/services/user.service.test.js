const userRepository = require("../../src/repository/user.repository");
const userService = require("../../src/services/user.service");
const { newUser, user } = require("../mock/user");

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

        const response = await userService.findByPk(1)

        expect(response).toEqual(user)
    });

    test("findByUuid", async () => {
        jest.spyOn(userRepository, "findByUuid").mockResolvedValueOnce(user)

        const response = await userService.findByUuid("1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed")

        expect(response).toEqual(user)
    });

});