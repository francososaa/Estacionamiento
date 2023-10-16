const vehicleService = require('../services/vehicle.service');

const newVehicle = async (req, res) => {
    const dataVehicle = req.body;

    const vehicleExists = await vehicleService.findVehicleByLicense(dataVehicle.license);
    if (vehicleExists) return res.status(500).send({ message: "Ya existe un vehiculo registrado con esa patente" });

    try{
        const vehicle = await vehicleService.create(dataVehicle);
        return res.send({ message: "Success", vehicle });
    } catch(error){
        return res.status(400).send({ message: error.original.detail});
    };
};

const getAllVehicle = async (req, res) => {
    const userId = req.user.userId;

    const vehicles = await vehicleService.allVehicles(userId);
    return res.send({ message: "Success", vehicles });
};

const getVehicleByLicense = async (req, res) => {
    const license = req.params.license;
    
    const vehicles = await vehicleService.findVehicleByLicense(license);
    return res.send({ message: "Success", vehicles });
};

const findByPk = async (req, res) => {
    const vehicleId = req.params.id;
    const userId = req.user.userId;

    const vehicle = await vehicleService.findVehicleById(vehicleId, userId);
    return res.send({ message: "Success", vehicle });
};

const update = async (req, res) => {
    const vehicleId = req.params.id;
    const userId = req.user.userId;
    const data = req.body;

    try{
        const vehicle = await vehicleService.findVehicleById(vehicleId, userId);
        if(!vehicle) return res.status(500).send({ message: "Vehiculo inexistente" });
    
        await vehicleService.updateById(data, vehicleId);
        return res.send({ message: "Success"});
    } catch(error){
        return res.status(400).send({ message: "No existe el tipo de vehiculo" });
    };
}

const cancel = async (req, res) => {
    const vehicleId = req.params.id;
    const userId = req.user.userId;

    const vehicle = await vehicleService.findVehicleById(vehicleId, userId);
    if(!vehicle) return res.status(500).send({ message: "Vehiculo inexistente" });

    await vehicleService.cancelVehicle(vehicle);
    return res.send({ message: "Success" });
};


module.exports = {
    newVehicle,
    getAllVehicle,
    getVehicleByLicense,
    cancel,
    findByPk,
    update
};
