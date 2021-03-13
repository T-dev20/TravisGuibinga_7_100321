const Article = require("..models/article");
var db = require("..config/mysql.config.js");
const jwt = require("jsonwebtoken");


//Fonction qui gère la logique métier de la route POST (ajout d'un nouvel article)
exports.createArticle = (req, res, next) => {
    let sql = `INSERT INTO Article(content, user_id, imageUrl, date_post) VALUES (?)`;
    let imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    let values = [req.body.content, req.body.user_id, imageUrl, req.body.date_post];
    db.query(sql, [values], function(err, data, fields) {
        if (err) {
            return res.status(400).json({err});
        }
        res.json({status: 201, data, message: "Nouvel article posté avec succès !"})
    });
};