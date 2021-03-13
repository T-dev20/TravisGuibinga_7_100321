const express = require('express');  // Importation de Express
const bodyParser = require('body-parser');  // Importation de body-parser: analysee les corps de requêtes entrants dans un middleware
const path = require('path');

var connection = require("./config/mysql.config");

const app = express();

app.use(bodyParser.json());


module.exports = app;