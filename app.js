require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('./src/utils/logger');
const { connectPostgresDB } = require('./src/models');

// Initializations
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Endpoints
app.use("/api-docs", require('./src/routes/api-docs'));
app.use("/api/v1/authenticate", require('./src/routes/authenticate'));
app.use("/api/v1/building_capacity", require('./src/routes/building_capacity'));
app.use("/api/v1/collection", require('./src/routes/collection'));
app.use("/api/v1/vehicle", require('./src/routes/vehicle'));
app.use("/api/v1/vehicleType", require('./src/routes/vehicleType'));
app.use("/api/v1/vehiclePrice", require('./src/routes/vehicle_price'));
app.use("/api/v1/reservation", require('./src/routes/reservation'));

//DB
connectPostgresDB();

// Starting the server
app.listen(process.env.PORT, () => logger.info(`Server running on port ${process.env.PORT}`));

