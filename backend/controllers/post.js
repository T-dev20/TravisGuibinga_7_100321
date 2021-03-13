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
    db.query(sql, [req.params.id], function(err, data) {
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
            throw "La modification de l'article n'est possible que soit par son auteur soit par l'Admin.";
        }
    });
 };

 exports.deleteArticle = (req, res, next) => {
    //Recherche dans la BDD de l'article à supprimé
    console.log(req.params.id);
    let sql = "UPDATE Article SET deleted = true WHERE id = ?";
    db.query(sql, [req.params.id], function(err, data) {
        if (err) {
            return res.status(400).json({err});
        }
        var articleToDeleted = data[0];
        //Comparaison de l'id du user courant avec l'id du user ayant posté l'article
        if (articleToDeleted.user_id === req.user.userId || req.user.isAdmin === 1) {
            let sql = "UPDATE Article SET deleted = true WHERE id = ?";
            let values = [req.body.content, req.body.user_id, imageUrl, req.body.date_post];
            db.query(sql, values, function(err, data, fields) {
                if (err) {
                    return res.status(400).json({err});
                }
                res.json({status: 201, data, message: "Article supprimé !"})
            });
        } else {
            throw "La suppression de l'article n'est possible que soit par son auteur soit par l'Admin.";
        }
    });
 };

//Fonction qui gère la logique métier de la route GET (affichage de tous les articles)
exports.getAllArticles = (req, res, next) => {
  let sql = "SELECT Article.id, content, date_post, username FROM Article INNER JOIN User ON Article.user_id = User.id ORDER BY date_post DESC"; 
  db.query(sql, function(err, data) {
    if (err) {
        return res.status(400).json({err});
    } 
    res.json({status: 200, data, message: "Articles affichés avec succès !"})
  });
};


//Fonction qui gère la logique métier de la route GET (affichage d'un article en particulier, sélectionné par son id)
exports.getOneArticle = (req, res, next) => {
    let sql = "SELECT Article.id, content, date_post, username FROM Article INNER JOIN User ON Article.user_id = User.id WHERE Article.id = ?";
    db.query(sql, [req.params.id], function(err, data, fields) {
    if (err) {
        return res.status(404).json({err});
    }
    res.json({status: 200, data, message: "Article affiché avec succès !"})
  });
};