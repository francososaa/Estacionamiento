const collectionService = require('../services/collection.service');

const getAll = async (req, res) => {
    const recaudation = await collectionService.getAll();
    return res.send({ message: "Success", recaudation });
};

const getRecaudationTotal = async (req, res) => {
    const date = req.params.date;

    const recaudation = await collectionService.getRecaudationTotalByDate(date);
    return res.send({ message: "Success", recaudation });
};

const getRecaudation = async (req, res) => {
    const date = req.params.date;

    const recaudation = await collectionService.getRecaudationByDate(date);
    return res.send({ message: "Success", recaudation });
};

module.exports = {
    getAll,
    getRecaudation,
    getRecaudationTotal
};
