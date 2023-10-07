const vehicleTypeService = require('../services/vehicleType.service');

const newVehicleType = async (req,res) => {
    const data = req.body;

    const vehicleType = await vehicleTypeService.create(data);
    return res.send({ message: "Success", vehicleType })
};

const getAllVehicle = async (req,res) => {
    const vehicleType = await vehicleTypeService.getAll();
    return res.send({ message: "Success", vehicleType });
};  

const findByPk = async (req,res) => {

};

const update = async (req,res) => {

};

const destroy = async (req,res) => {

};

module.exports = {
    newVehicleType,
    getAllVehicle,
    findByPk,
    update,
    destroy
};


