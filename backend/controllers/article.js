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

//Fonction qui gère la logique métier de la route PUT (modification d'un article posté par son auteur, sélectionné par son id)
 exports.modifyArticle = (req, res, next) => {
    //Recherche dans la BDD de l'article à modifier
    console.log(req.params.id);
    let sql = "SELECT * FROM Article WHERE id = ?";
    db.query(sql, [req.params.slug], function(err, data) {
        if (err) {
            return res.status(400).json({err});
        }
        var articleToModify = data[0];
        //Comparaison de l'id du user courant avec l'id du user ayant posté l'article
        if (articleToModify.user_id === req.user.userId || req.user.isAdmin === 1) {
            let imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            let sql = `UPDATE Article SET content = ?, user_id = ?, imageUrl = ?, date_post = ? WHERE id = ?`;
            let values = [req.body.content, req.body.user_id, imageUrl, req.body.date_post];
            db.query(sql, values, function(err, data, fields) {
                if (err) {
                    return res.status(400).json({err});
                }
                res.json({status: 201, data, message: "Article modifié !"})
            });
        } else {
            throw "La modification de l'article est possible soit par son auteur soit par l'Admin.";
        }
    });
 };