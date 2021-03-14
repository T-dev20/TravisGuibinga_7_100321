const mysqlConfig = require("./mysql.config");
const Sequelize = require("sequelize");
module.exports = new Sequelize(mysqlConfig.DB, mysqlConfig.USER, mysqlConfig.PASSWORD, {
  host: mysqlConfig.HOST,
  dialect: mysqlConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: mysqlConfig.pool.max,
    min: mysqlConfig.pool.min,
    acquire: mysqlConfig.pool.acquire,
    idle: mysqlConfig.pool.idle
  },
});