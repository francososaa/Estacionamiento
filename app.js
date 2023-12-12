const express = require('express');
const cors = require('cors');
const { swagger } = require('./src/routes/api-docs');
const { connectPostgresDB } = require('./src/models');
// // const AuthenticateRouter = require("./src/routes/authenticate");
const BuildingCapacityRouter = require("./src/routes/building_capacity");
const CollectionRouter = require("./src/routes/collection");
// const VehicleRouter = require("./src/routes/vehicle");
const VehicleTypeRouter = require("./src/routes/vehicleType");
const VehiclePriceRouter = require("./src/routes/vehicle_price");
// const ReservationRouter = require("./src/routes/reservation");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// // app.use("/api/v1/authenticate", AuthenticateRouter);
app.use("/api/v1/building_capacity", BuildingCapacityRouter);
app.use("/api/v1/collection", CollectionRouter);
// app.use("/api/v1/vehicle", VehicleRouter);
app.use("/api/v1/vehicleType", VehicleTypeRouter);
app.use("/api/v1/vehiclePrice", VehiclePriceRouter);
// app.use("/api/v1/reservation", ReservationRouter);

connectPostgresDB();

swagger(app)

module.exports = app;


