const vehiclePriceService = require('../services/vehiclePrice.service');

const newVehiclePrice = async (req, res) => {
    const vehiclePrice = req.body;

    try {
        const existePrice = await vehiclePriceService.findByVehicleType(vehiclePrice.vehicleTypeId);
        if( existePrice ) return res.status(400).send({ message: "Ya existe el precio para ese tipo de vehiculo" });
    
        await vehiclePriceService.create(vehiclePrice);
        return res.status(201).send({ message: "Success"}); 
    } catch(error){
        return res.status(500).send({ message: "No se pudo crear el precio" });
    };
};

const getAll = async (req, res) => {
    const vehiclePrice = await vehiclePriceService.getAll();
    return res.send({ message: "Success", vehiclePrice });
};

const update = async (req, res) => {
    const data = req.body;

    const existePrice = await vehiclePriceService.findByVehicleType(data.vehicleTypeId);
    if( !existePrice ) return res.status(404).send({ message: "No existe el tipo de vehiculo" });

    await vehiclePriceService.update(data)
    return res.send({ message: "Success" });
};

module.exports = {
    newVehiclePrice,
    getAll,
    update,
};
