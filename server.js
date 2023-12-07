const app = require('./app');
const logger = require('./src/utils/logger');

app.listen(process.env.PORT, () => logger.info(`Server running on port ${process.env.PORT}`));
