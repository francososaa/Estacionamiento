const vehicleService = require('../services/vehicle.service');

const newVehicle = async (req, res) => {
    const dataVehicle = req.body;

    const vehicleExists = await vehicleService.findVehicleByLicense(dataVehicle.license, dataVehicle.userId);
    if ( vehicleExists ) return res.status(400).send({ message: "Ya existe un vehiculo registrado con esa patente" });

    try{
        await vehicleService.create(dataVehicle);
        return res.status(201).send({ message: "Success" });
    } catch(error){
        return res.status(500).send({ message: "Error al crear el vehiculo" });
    };
};

const getAllVehicle = async (req, res) => {
    const userId = req.params.userId;

    const vehicles = await vehicleService.allVehicles(userId);
    return res.send({ message: "Success", vehicles });
};

const getVehicleByLicense = async (req, res) => {
    const license = req.params.license;
    const userId = req.params.userId;
    
    const vehicle = await vehicleService.findVehicleByLicense(license, userId);
    if( !vehicle ) return res.status(404).send({ message: "Vehiculo inexistente" });
    
    return res.send({ message: "Success", vehicle });
};

const findByPk = async (req, res) => {
    const vehicleId = req.params.id;

    const vehicle = await vehicleService.findVehicleById(vehicleId);
    if( !vehicle ) return res.status(404).send({ message: "Vehiculo inexistente" });

    return res.send({ message: "Success", vehicle });
};

const update = async (req, res) => {
    const vehicleId = req.params.id;
    const data = req.body;

    const vehicle = await vehicleService.findVehicleById(vehicleId);
    if( !vehicle ) return res.status(404).send({ message: "Vehiculo inexistente" });
    
    await vehicleService.updateById(data, vehicleId);
    return res.send({ message: "Success"});
}

const cancel = async (req, res) => {
    const vehicleId = req.params.id;

    const vehicle = await vehicleService.findVehicleById(vehicleId);
    if( !vehicle ) return res.status(404).send({ message: "Vehiculo inexistente" });

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
