"use strict";

const express = require('express');
const app = express();

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

// Swagger documentation
const options = {
    definition: {
        info: {
            version: "1.0.0",
            tittle: "Documentacion API",
            description: "Documentacion de la API para los usuarios",
            contact: {
                name: "Sosa Franco Jose",
                url: "https://www.linkedin.com/in/francososa/"
            },
            servers: ["http://localhost:8081"]
        }
    },
    apis: ["src/routes/index.js"]
};

const swaggerDocs = swaggerJsDoc(options);

const swagger = (app) => {
    // app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
    app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
};


module.exports = { swagger };
