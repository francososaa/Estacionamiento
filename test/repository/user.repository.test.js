const userRepository = require("../../src/repository/user.repository");
const { db } = require("../../src/models");
const { createUser, user } = require("../mock/user");

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

        const response = await userRepository.findById(1)

        expect(response).toEqual(user)
    });

    test("findOne", async () => {
        jest.spyOn(db.user, "findOne").mockResolvedValueOnce(user)

        const response = await userRepository.findOne("franco@gmail.com")

        expect(response).toEqual(user)
    });

    test("findByUuid", async () => {
        jest.spyOn(db.user, "findByPk").mockResolvedValueOnce(user)

        const response = await userRepository.findByUuid("26e56b1c-b73c-47b8-9a92-dfd8e371821a")

        expect(response).toEqual(user)
    });
});