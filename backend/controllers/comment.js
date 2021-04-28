require('dotenv').config;
const db = require('../models');
const jwt = require('jsonwebtoken');


exports.modifyComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;

    db.Comment.findOne({include: {
            model: db.User,
            attributes: ["name", "role", "image_profil"]
        },
        where: { id: req.params.id } })
        .then(comment => {
            if (comment.OwnerId == userId) {
                comment.update({
                content: req.body.commentContent
            })
            .then(() => res.status(201).json({ message: 'Commentaire modifié.' }))
            .catch(error => res.status(400).json({ error }))
            }else {
                return res.status(404).json({ error: "Vous n'êtes pas autorisé à modifier ce commentaire !" })
            }
            
        })
    .catch(error => res.status(400).json({ message: "erreur" })) 
};

exports.deleteComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;
    const userRole = decodedToken.role;

    db.Comment.findOne({include: {
            model: db.User,
            attributes: ["name", "role", "image_profil"]
        },
        where: { id: req.params.id } })
        .then(comment => {
            if (comment.OwnerId == userId || userRole == "Admin") {
            comment.destroy({ where: { id: req.params.id } })
            .then(() => res.status(201).json({ message: 'Commentaire supprimé.' }))
            .catch(error => res.status(400).json({ error }))
            }else {
                return res.status(404).json({ error: "'Vous n'êtes pas autorisé à supprimer ce commentaire !'" })
            }
            
        })
    .catch(error => res.status(400).json({ error }))
};