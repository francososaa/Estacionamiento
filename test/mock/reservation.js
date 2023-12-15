const newReservation = {   
    "date":"2023-12-05",
    "vehicleId": "3ecf034a-76d6-44d3-8620-9bbf68038d30",
    "userId": "d58a01a1-135c-49d0-8f39-d6c5a3ba6037"
};

const reservation = {
    "reservationId": "5d2c5841-1564-44a3-9288-7031330f58a9",
    "date": "2023-12-11",
    "vehicleId": "3ecf034a-76d6-44d3-8620-9bbf68038d30",
    "userId": "d58a01a1-135c-49d0-8f39-d6c5a3ba6037",
    "state": "CREATED",
    "updatedAt": "2023-12-11T15:56:52.421Z",
    "createdAt": "2023-12-11T15:56:52.421Z"
};

const reservations = [
    {
        "reservationId": "5d2c5841-1564-44a3-9288-7031330f58a9",
        "state": "CREATED",
        "date": "2023-12-11",
        "createdAt": "2023-12-11T15:56:52.421Z",
        "updatedAt": "2023-12-11T15:56:52.421Z",
        "vehicleId": "3ecf034a-76d6-44d3-8620-9bbf68038d30",
        "userId": "d58a01a1-135c-49d0-8f39-d6c5a3ba6037"
    },
    {
        "reservationId": "5d2c5841-1564-44a3-9288-7031330f58a9",
        "state": "CREATED",
        "date": "2023-12-05",
        "createdAt": "2023-12-11T15:56:52.421Z",
        "updatedAt": "2023-12-11T15:56:52.421Z",
        "vehicleId": "3ecf034a-76d6-92m7-8620-9bbf68038d30",
        "userId": "7986de3f-3206-46d9-a8da-1ad194caf91e"
    },
    {
        "reservationId": "5d2c5841-1564-44a3-9288-7031330f58a9",
        "state": "CREATED",
        "date": "2023-12-11",
        "createdAt": "2023-12-11T15:56:52.421Z",
        "updatedAt": "2023-12-11T15:56:52.421Z",
        "vehicleId": "3ecf034a-76d6-26y2-8620-9bbf68038d30",
        "userId": "7986de3f-3206-46d9-a8da-1ad194caf91e"
    }
];

const reservationsByDate = [
    {
        "reservationId": "5d2c5841-1564-44a3-9288-7031330f58a9",
        "state": "CREATED",
        "date": "2023-12-15",
        "createdAt": "2023-12-11T15:56:52.421Z",
        "updatedAt": "2023-12-11T15:56:52.421Z",
        "vehicleId": "3ecf034a-76d6-44d3-8620-9bbf68038d30",
        "userId": "d58a01a1-135c-49d0-8f39-d6c5a3ba6037"
    },
    {
        "reservationId": "5d2c5841-1564-44a3-9288-7031330f58a9",
        "state": "CREATED",
        "date": "2023-12-15",
        "createdAt": "2023-12-11T15:56:52.421Z",
        "updatedAt": "2023-12-11T15:56:52.421Z",
        "vehicleId": "3ecf034a-76d6-92m7-8620-9bbf68038d30",
        "userId": "7986de3f-3206-46d9-a8da-1ad194caf91e"
    },
    {
        "reservationId": "5d2c5841-1564-44a3-9288-7031330f58a9",
        "state": "CREATED",
        "date": "2023-12-15",
        "createdAt": "2023-12-11T15:56:52.421Z",
        "updatedAt": "2023-12-11T15:56:52.421Z",
        "vehicleId": "3ecf034a-76d6-26y2-8620-9bbf68038d30",
        "userId": "7986de3f-3206-46d9-a8da-1ad194caf91e"
    }
];

const update = {
    "vehicleId": "80f49484-3201-4a56-8289-3a432dc2fa6a"
};

const updateStatus = {
    "state": "IN PROGRESS",
    "userId": "7654206c-4b6d-4afe-941b-ec63233df18f"
};

module.exports = {
    newReservation,
    reservation,
    reservations,
    reservationsByDate,
    update,
    updateStatus
};
