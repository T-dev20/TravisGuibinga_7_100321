const express = require('express');  // Importation de Express
const bodyParser = require('body-parser');  // Importation de body-parser: analysee les corps de requêtes entrants dans un middleware
const path = require('path');
const mysql = require("mysql");

const connection = mysql.createConnection({
    host : "localhost",
    user: "root",
    password : "Trav15#",
    database : "groupomania"
});

//Connexion à MySQL
connection.connect(function(error) {
    if (error) {
        console.error("La connexion à MySQL a échoué !"); 
        return;
    }
    console.log("Connexion à MySQL réussie !");
});

const app = express();

app.use(bodyParser.json());


module.exports = app;