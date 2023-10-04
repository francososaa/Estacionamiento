const vehicleService = require('../services/vehicle.service');

const newVehicle = async (req, res) => {

    const dataVehicle = req.body;
    const vehicleExists = await vehicleService.findVehicleByLicense(dataVehicle.license);
    if ( vehicleExists ) return res.status(500).send({ message: "Ya existe un vehiculo registrado con esa patente" });

    try{
        const vehicle = await vehicleService.create(dataVehicle);
        return res.send({ message: "Success", vehicle });
    } catch(error){
        return res.status(400).send({ message: error.original.detail});
    }
};

const getAllVehicle = async (req, res) => {
    const vehicles = await vehicleService.allVehicles();
    return res.send({ message: "Success", vehicles });
};

const getVehicleByLicense = async (req, res) => {
    const license = req.params.license;
    const vehicles = await vehicleService.findVehicleByLicense(license);
    return res.send({ message: "Success", vehicles });
};

const findByPk = async (req, res) => {
    const vehicleId = req.params.id;
    const vehicle = await vehicleService.findVehicleById(vehicleId);
    return res.send({ message: "Success", vehicle });
};

const update = async (req, res) => {
    const vehicleId = req.params.id;
    const data = req.body;

    const vehicle = await vehicleService.findVehicleById(vehicleId);
    if( !vehicle ) return res.status(500).send({ message: "Vehiculo inexistente" });

    const vehicleUpdate = await vehicleService.updateById(data, vehicleId);

    return res.send({ message: "Success", vehicle: vehicleUpdate });
};

const cancel = async (req, res) => {
    const vehicleId = req.params.id;

    const vehicle = await this.findVehicleById(vehicleId);
    if( !vehicle ) return res.status(500).send({ message: "Vehiculo inexistente" });

    const cancelled = await vehicleService.cancelVehicle(vehicle);
    if( cancelled === -1 ) return res.status(500).send({ message: "No se pudo cancelar el vehiculo" });

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
