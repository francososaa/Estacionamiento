const serviceBuildingCapacity = require('../services/building_capacity.service');

const addCapacity = async (req, res) => {

    const dataCapacity = req.body;
    const validaDate = await serviceBuildingCapacity.validaDateAndType(dataCapacity);
    if ( validaDate ) return res.status(500).send({ message: "Ya existe la capacidad para esa fecha y vehiculo"});

    try{
        const createCapacity = await serviceBuildingCapacity.create(dataCapacity);
        return res.send({ message: "Success", Building_Capacity: createCapacity });
    } catch(error){
        return res.status(400).send({ message: error });
    }
};

module.exports = {
    addCapacity,
};
