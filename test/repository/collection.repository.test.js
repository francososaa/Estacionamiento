const collectionRepository = require("../../src/repository/collection.repository");
const { db } = require("../../src/models");
const { recaudations } = require("../mock/collection");
const { date, id } = require("../mock/generalMock");
describe("Building Capacity Repository", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    test("getAll", async () => {
        jest.spyOn(db.collection, "findAll").mockResolvedValueOnce(recaudations)

        const response = await collectionRepository.getAll()

        expect(response).toEqual(recaudations)
    });

    test("getAllCollectionByDate", async () => {
        jest.spyOn(db.collection, "findAll").mockResolvedValueOnce(recaudations)

        const response = await collectionRepository.getAllCollectionByDate(`${date}`)

        expect(response).toEqual(recaudations)
    });

    test("destoy", async () => {
        jest.spyOn(db.collection, "destroy").mockResolvedValueOnce(true)

        const response = await collectionRepository.destoy(`${id}`)

        expect(response).toEqual(true)
    });
});