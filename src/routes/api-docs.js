"use strict";

const express = require('express');
const app = express();

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// Swagger documentation
const swaggerOptions = {
    swaggerDefinition: {
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
    basePath: "/",

    //APIs a documentar
    apis: ["./routes/index.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

module.exports = app;
