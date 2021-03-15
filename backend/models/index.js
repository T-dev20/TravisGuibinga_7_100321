const mysqlConfig = require("../config/mysql.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(mysqlConfig.DB, mysqlConfig.USER, mysqlConfig.PASSWORD, {
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

module.exports = sequelize;

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User.js")(sequelize, Sequelize);
db.Post = require("./Post.js")(sequelize, Sequelize);
db.Comment = require("./Comment.js")(sequelize, Sequelize);

// Contraintes de clés étrangères
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User, { foreignKey: 'UserId', onDelete: 'CASCADE' });


db.Post.hasMany(db.Comment);
db.Comment.belongsTo(db.Post, { foreignKey: 'PostId', onDelete: 'CASCADE' });
db.Comment.belongsTo(db.User, { foreignKey: 'OwnerId', onDelete: 'CASCADE' });

module.exports = db;