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

module.exports = connection;