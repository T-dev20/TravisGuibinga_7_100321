require('dotenv').config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000
  },
});

// Test DB_connexion
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User.js")(sequelize, Sequelize);
db.Post = require("./Post.js")(sequelize, Sequelize);
db.Comment = require("./Comment.js")(sequelize, Sequelize);

// Contraintes de clés étrangères
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User, { foreignKey: 'UserId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });


db.Post.hasMany(db.Comment);
db.Comment.belongsTo(db.Post, { foreignKey: 'PostId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
db.Comment.belongsTo(db.User, { foreignKey: 'OwnerId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = db;