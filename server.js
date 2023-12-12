require('dotenv').config();
const app = require('./app');
const logger = require('./src/utils/logger');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => logger.info(`Server running on port ${process.env.PORT}`));

module.exports = server;



