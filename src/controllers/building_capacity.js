const buildingCapacityService = require('../services/building_capacity.service');

const newCapacity = async (req, res) => {
    const dataCapacity = req.body;

    const validaDate = await buildingCapacityService.validaDateAndType(dataCapacity.date, dataCapacity.vehicleTypeId);
    if (validaDate) return res.status(500).send({ message: "Ya existe la capacidad para esa fecha y vehiculo" });

    const createCapacity = await buildingCapacityService.create(dataCapacity);
    return res.status(201).send({ message: "Success", Building_Capacity: createCapacity });
};

const getBuildingCapacity = async (req, res) => {
    const capacity = await buildingCapacityService.getAll();
    return res.send({ message: "Success", capacity });
};

const update = async (req, res) => {
    const date = req.params.date;
    const vehicleTypeId = req.params.vehicleTypeId;
    const overallCapacity = req.body.overallCapacity;

    const capacity = await buildingCapacityService.validaDateAndType(date, vehicleTypeId);
    if(!capacity) return res.status(500).send({ message: "No se encuentra fecha o tipo de vehiculo" })

    await buildingCapacityService.updateOverallCapacityForDateAndTypeVehicle(date, vehicleTypeId, overallCapacity);
    return res.send({ message: "Success" });
};

const destroyCapacity = async (req, res) => {
    const date = req.params.date;
    const vehicleTypeId = req.params.vehicleTypeId;

    const validate = await buildingCapacityService.validaDateAndType(date, vehicleTypeId);
    if(!validate) return res.status(500).send({ message: "No se encuentra fecha o tipo de vehiculo" })

    await buildingCapacityService.destroyForDateAndVehicleType(date, vehicleTypeId);
    return res.send({ message: "Success" });
};


module.exports = {
    newCapacity,
    getBuildingCapacity,
    update,
    destroyCapacity,
};
