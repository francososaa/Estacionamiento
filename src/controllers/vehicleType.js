const vehicleTypeService = require('../services/vehicleType.service');

const newVehicleType = async (req,res) => {
    const data = req.body;

    const vehicleExists = await vehicleTypeService.findVehicleType(data);
    if ( vehicleExists ) return res.status(500).send({ message: "Ya existe un vehiculo registrado" });

    try{
        const vehicle = await vehicleTypeService.create(data);
        return res.send({ message: "Success", vehicle });
    } catch(error){
        return res.status(400).send({ message: error.original.detail});
    }

    // const vehicleType = await vehicleTypeService.create(data);
    // return res.send({ message: "Success", vehicleType })
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


