const express = require('express');  // Importation de Express
const bodyParser = require('body-parser');  // Importation de body-parser: analysee les corps de requêtes entrants dans un middleware
const path = require('path');
const userRoutes = require('./routes/user');
// const articleRoutes = require('./routes/article');

const db = require("./config/index");

// Test DB_connexion
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', userRoutes);
// app.use('/articles', articleRoutes);


module.exports = app;