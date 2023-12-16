const collectionRepository = require('../repository/collection.repository');

class CollectionService {

    constructor() {};

    async getAll(){
        return await collectionRepository.getAll();
    };

    async getRecaudationTotalByDate(date){
        const recaudation = await collectionRepository.getAllCollectionByDate(date);
        return this.addRecaudation(recaudation)
    };

    async getRecaudationByDate(date){
        return await collectionRepository.getAllCollectionByDate(date);
    };

    async addRecaudation(recaudation){
        let total = 0;
        for (let i of recaudation) total += i.moneyGenerated;
        
        return {
            date: recaudation.date,
            total: total
        }
    };
};

module.exports = new CollectionService();
