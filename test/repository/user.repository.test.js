const userRepository = require("../../src/repository/user.repository");
const { db } = require("../../src/models");
const { createUser, user } = require("../mock/user");
const { id } = require("../mock/generalMock");
describe("User Repository", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    test("create", async () => {
        jest.spyOn(db.user, "create").mockResolvedValueOnce(user)

        const response = await userRepository.create(createUser)

        expect(response).toEqual(user)
    });

    test("findById", async () => {
        jest.spyOn(db.user, "findByPk").mockResolvedValueOnce(user)

        const response = await userRepository.findById(`${id}`)

        expect(response).toEqual(user)
    });

    test("findOne", async () => {
        jest.spyOn(db.user, "findOne").mockResolvedValueOnce(user)

        const response = await userRepository.findOne("test@gmail.com")

        expect(response).toEqual(user)
    });

    test("findByUuid", async () => {
        jest.spyOn(db.user, "findByPk").mockResolvedValueOnce(user)

        const response = await userRepository.findByUuid(`${id}`)

        expect(response).toEqual(user)
    });
});