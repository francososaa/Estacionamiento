require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');
const logger = require('./src/utils/logger');
const IndexRouter = require('./src/routes');
const { connectPostgresDB } = require('./src/models');

// Initializations
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Endpoints
app.use(IndexRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//DB
connectPostgresDB();

// Starting the server
app.listen(process.env.PORT, () => logger.info(`Server running on port ${process.env.PORT}`));

