const newVehicle = {
    "license": "OTC015",
    "model": "volkswagen",
    "vehicleTypeId": "1",
    "userId": "612f5764-b18a-4118-b96a-ae6964987758"
};

const vehicle = {
    "vehicleId": "3ecf034a-76d6-44d3-8620-9bbf68038d30",
    "license": "OTC015",
    "model": "volkswagen",
    "user": { "firstname": "franco", "lastname": "sosa" },
    "vehicleType": { "description": "auto" }
};

const allVehicles = [
    {
        "vehicleId": "3ecf034a-76d6-44d3-8620-9bbf68038d30",
        "license": "OTC015",
        "model": "volkswagen",
        "user": { "firstname": "franco", "lastname": "sosa" },
        "vehicleType": { "description": "auto" }
    },
    {
        "vehicleId": "3ecf034a-76d6-44d3-1925-9bbf68038d30",
        "license": "BRL381",
        "model": "chevrolet",
        "user": { "firstname": "franco", "lastname": "sosa" },
        "vehicleType": { "description": "camioneta" }
    },
    {
        "vehicleId": "3ecf034a-76d6-44d3-8263-9bbf68038d30",
        "license": "PRX169",
        "model": "ford",
        "user": { "firstname": "franco", "lastname": "sosa" },
        "vehicleType": { "description": "auto" }
    }
];

module.exports = {
    allVehicles,
    newVehicle,
    vehicle,
};
