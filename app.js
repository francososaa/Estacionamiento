require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('./src/utils/logger');
const { connectPostgresDB } = require('./src/db/dataBase');

// Initializations
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Endpoints
app.use("/api-docs", require('./src/routes/api-docs'));

//DB
connectPostgresDB();

// Starting the server
app.listen(process.env.PORT, () => logger.info(`Server running on port ${process.env.PORT}`) );

