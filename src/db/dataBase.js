/* eslint-disable no-undef */
require('dotenv').config();
const { Sequelize } = require('sequelize');

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

db.sequelize = sequelize

const connectPostgresDB = async () => {
  try {
    await db.sequelize.authenticate()
    await db.sequelize.sync({ force: true })
    console.log(('Connected to database successfully'))
  } catch (error) {
    console.log('Could not connect to database')
  }
}

module.exports = { db, connectPostgresDB }
