const vehicleTypeService = require('../services/vehicleType.service');

const newVehicleType = async (req,res) => {
    const data = req.body;

    const vehicleExists = await vehicleTypeService.findVehicleType(data.description);
    if ( vehicleExists ) return res.status(400).send({ message: "Ya existe un vehiculo registrado." });

    try{
        await vehicleTypeService.create(data);
        return res.status(201).send({ message: "Success" });
    } catch(error){
        return res.status(500).send({ message: error.original.detail});
    };
};

const getAllVehicle = async (req,res) => {
    const vehicleType = await vehicleTypeService.getAll();
    return res.status(200).send({ message: "Success", vehicleType });
};  

const update = async (req,res) => {
    const data = req.body;
    const id = req.params.id;

    const vehicleExists = await vehicleTypeService.findById(id);
    if ( !vehicleExists ) return res.status(404).send({ message: "No existe el tipo de vehiculo" });

    await vehicleTypeService.update(data, id);
    return res.status(200).send({ message: "Success" });
};

const destroy = async (req,res) => {
    const id = req.params.id;

    const vehicle = await vehicleTypeService.findById(id);
    if( !vehicle ) return res.status(404).send({ message: "Tipo de vehiculo inexistente" });

    await vehicleTypeService.deleteTypeVehicle(id);
    return res.status(200).send({ message: "Success" });
};

module.exports = {
    newVehicleType,
    getAllVehicle,
    update,
    destroy
};


