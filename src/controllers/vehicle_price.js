const vehiclePriceService = require('../services/vehiclePrice.service');

const newVehiclePrice = async (req, res) => {
    const vehicle_price = req.body;

    try {
        const existePrice = await vehiclePriceService.findByVehicleType(vehicle_price.vehicleTypeId);
        if( existePrice ) return res.status(400).send({ message: "Ya existe el precio para ese tipo de vehiculo" });
    
        await vehiclePriceService.create(vehicle_price);
        return res.status(201).send({ message: "Success"}); 
    } catch(error){
        return res.status(404).send({ message: "No existe el tipo de vehiculo" });
    };
};

const getAll = async (req, res) => {
    const vehicle_price = await vehiclePriceService.getAll();
    return res.status(200).send({ mssage: "Success", vehiclePrice: vehicle_price });
};

const update = async (req, res) => {
    const data = req.body;

    const existePrice = await vehiclePriceService.findByVehicleType(data.vehicleTypeId);
    if( !existePrice ) return res.status(404).send({ message: "No existe el tipo de vehiculo" });

    await vehiclePriceService.update(data)
    return res.status(200).send({ mssage: "Success" });
};

module.exports = {
    newVehiclePrice,
    getAll,
    update,
};
