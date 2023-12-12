const express = require('express');
const cors = require('cors');
const Router = require('./src/routes');
const { swagger } = require('./src/routes/api-docs');
const { connectPostgresDB } = require('./src/models');

// Initializations
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Endpoints
app.use(Router);

//DB
connectPostgresDB();

// swagger
swagger(app)

module.exports = app;


