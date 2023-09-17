/* eslint-disable no-undef */
require('dotenv').config();
const logger  = require('../utils/logger');
const Sequelize  = require('sequelize');
const { DataTypes }  = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT
  }
)

const db = {}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.building_capacity = require('../models/building_capacity.model')(sequelize, DataTypes);
db.collection = require('../models/collection.models')(sequelize, DataTypes);
db.reservation = require('../models/reservation.model')(sequelize, DataTypes);
db.reservation_person_data = require('../models/reservation_person_data.model')(sequelize, DataTypes);
db.user = require('../models/user.model')(sequelize, DataTypes);
db.vehicle = require('../models/vehicle.model')(sequelize, DataTypes);
db.vehicle_price = require('../models/vehicle_price.model')(sequelize, DataTypes);
db.vehicle_type = require('../models/vehicle_type.model')(sequelize, DataTypes);

// RELATIONS

db.vehicle_type.hasMany(db.vehicle, {
  foreignKey: "vehicleTypeId",
  as: "vehicles",
});

db.vehicle_type.hasMany(db.building_capacity, {
  foreignKey: "vehicleTypeId",
  as: "buildingCapacities",
});

db.vehicle.belongsTo(db.vehicle_type, {
  foreignKey: "vehicleTypeId",
  as: "vehicleType",
});

db.vehicle.hasMany(db.reservation, {
  foreignKey: "vehicleId",
  as: "reservations",
});

db.building_capacity.belongsTo(db.vehicle_type, {
  foreignKey: "vehicleTypeId",
  as: "vehicleType",
});

db.reservation.belongsTo(db.vehicle, {
  foreignKey: "vehicleId",
  as: "vehicle",
});

db.reservation.belongsTo(db.reservation_person_data, {
  foreignKey: "reservationPersonDataId",
  as: "reservationPersonDataId",
});

db.reservation_person_data.hasMany(db.reservation, {
  foreignKey: "reservationPersonDataId",
  as: "reservations",
});

db.user.hasMany(db.vehicle, {
  foreignKey: "userId",
  as: "userId",
});

db.reservation_person_data.belongsTo(db.user, {
  foreignKey: "userId",
  as: "userId",
});

db.collection.belongsTo(db.vehicle_type, {
  foreignKey: "vehicleTypeId",
  as: "vehicleTypeId",
});

db.vehicle_price.hasMany(db.vehicle_type, {
  foreignKey: "vehiclePriceId",
  as: "",
});



const connectPostgresDB = async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    logger.info('DB Connected');
  } catch (error) {
    logger.error(`DB Connection Error: ${error}`);
  }
}

module.exports = { db, connectPostgresDB }
