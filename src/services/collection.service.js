const collectionRepository = require('../repository/collection.repository');

class CollectionService {

    constructor() {};

    async getAll(){
        return await collectionRepository.getAll();
    };

    async getCollectionTotalByDate(date){
        const recaudation = await collectionRepository.getCollectionByDate(date);
        return this.addCollection(recaudation);
    };

    async getCollectionByDate(date){
        return await collectionRepository.getCollectionByDate(date);
    };

    async addCollection(recaudation){
        let total = 0;
        for (let i of recaudation) total += i.moneyGenerated;
        return total;
    };

};

module.exports = new CollectionService();
