const vehiclePrice = require('../services/vehiclePrice.service');

const newVehiclePrice = async (req, res) => {
    const vehicle_price = req.body;

    await vehiclePrice.create(vehicle_price);
    return res.send({ message: "Success"}); 
};

const getAll = async (req, res) => {
    const vehicle_price = await vehiclePrice.getAll();
    return res.send({ mssage: "Success", vehiclePrice: vehicle_price });
};

const update = async (req, res) => {
    const data = req.body;

    await vehiclePrice.update(data)
    return res.send({ mssage: "Success" });
};

module.exports = {
    newVehiclePrice,
    getAll,
    update,
};
