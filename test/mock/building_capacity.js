const newCapacity = {
    "date": "2023-10-31",
    "totalVehicles": 0,
    "overallCapacity": 10,
    "overallCapacityOccupied": 0,
    "vehicleTypeId": 3
};

const buildingCapacity = {
    "isCompleteOverallCapacity": false,
    "buildingCapacityId": 5,
    "date": "2023-12-11",
    "totalVehicles": 0,
    "overallCapacity": 10,
    "overallCapacityOccupied": 0,
    "vehicleTypeId": 3,
    "updatedAt": "2023-12-11T15:21:18.219Z",
    "createdAt": "2023-12-11T15:21:18.219Z"
};

const capacity = [
    {
        "buildingCapacityId": 1,
        "date": "2023-10-30",
        "totalVehicles": 0,
        "overallCapacity": 10,
        "overallCapacityOccupied": 0,
        "vehicleType": {
            "description": "moto"
        }
    },
    {
        "buildingCapacityId": 2,
        "date": "2023-10-31",
        "totalVehicles": 0,
        "overallCapacity": 10,
        "overallCapacityOccupied": 0,
        "vehicleType": {
            "description": "moto"
        }
    },
    {
        "buildingCapacityId": 3,
        "date": "2023-11-30",
        "totalVehicles": 1,
        "overallCapacity": 10,
        "overallCapacityOccupied": 1,
        "vehicleType": {
            "description": "auto"
        }
    },
    {
        "buildingCapacityId": 4,
        "date": "2023-12-05",
        "totalVehicles": 3,
        "overallCapacity": 3,
        "overallCapacityOccupied": 3,
        "vehicleType": {
            "description": "auto"
        }
    },
    {
        "buildingCapacityId": 5,
        "date": "2023-12-11",
        "totalVehicles": 0,
        "overallCapacity": 10,
        "overallCapacityOccupied": 0,
        "vehicleType": {
            "description": "moto"
        }
    }
];


module.exports = {
    newCapacity,
    buildingCapacity,
    capacity,
};
