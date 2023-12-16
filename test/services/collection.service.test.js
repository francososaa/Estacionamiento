const collectionRepository = require("../../src/repository/collection.repository");
const collectionService = require("../../src/services/collection.service");
const { recaudacionByDate, recaudacionByDateTotal, recaudations  } = require("../mock/collection");

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
        
        const response = await collectionService.getRecaudationTotalByDate("2023-12-15")

        expect(response).toEqual(recaudacionByDateTotal)
    });

    test("getRecaudationByDate", async () => {
        jest.spyOn(collectionRepository, "getAllCollectionByDate").mockResolvedValueOnce(recaudacionByDate)

        const response = await collectionService.getRecaudationByDate("2023-12-15")

        expect(response).toEqual(recaudacionByDate)
    });

    test("addRecaudation", async () => {
        jest.spyOn(collectionService, "addRecaudation").mockResolvedValueOnce(recaudacionByDateTotal)

        const response = await collectionService.addRecaudation(recaudacionByDate)

        expect(response).toEqual(recaudacionByDateTotal)
    });

});