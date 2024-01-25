const collectionRepository = require("../../src/repository/collection.repository");
const collectionService = require("../../src/services/collection.service");
const { recaudacionByDate, recaudacionByDateTotal, recaudations  } = require("../mock/collection");
const { date } = require("../mock/generalMock");
describe("Collection Service", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    test("getAll", async () => {
        jest.spyOn(collectionRepository, "getAll").mockResolvedValueOnce(recaudations)

        const response = await collectionService.getAll()

        expect(response).toEqual(recaudations)
    });

    test("getRecaudationTotalByDate", async () => {
        jest.spyOn(collectionRepository, "getAllCollectionByDate").mockResolvedValueOnce(recaudacionByDate)
        jest.spyOn(collectionService, "addRecaudation").mockResolvedValueOnce(recaudacionByDateTotal)
        
        const response = await collectionService.getRecaudationTotalByDate(`${date}`)

        expect(response).toEqual(recaudacionByDateTotal)
    });

    test("getRecaudationByDate", async () => {
        jest.spyOn(collectionRepository, "getAllCollectionByDate").mockResolvedValueOnce(recaudacionByDate)

        const response = await collectionService.getRecaudationByDate(`${date}`)

        expect(response).toEqual(recaudacionByDate)
    });

});