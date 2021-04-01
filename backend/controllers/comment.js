require('dotenv').config;
const db = require('../models');
const jwt = require('jsonwebtoken');


exports.modifyComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;
    const userName = decodedToken.userName;
    console.log(userId, userName)

    db.Comment.findOne({ 
        where: { id: req.params.id } })
        .then(comment => {
            if (comment.OwnerId == userId) {
                comment.update({
                content: req.body.content
            })
            .then(() => res.status(201).json({ message: 'Commentaire modifié.' }))
            .catch(error => res.status(400).json({ error }))
            }else {
                return res.status(404).json({ error: "'Vous n'êtes pas autorisé à modifié ce commentaire !'" })
            }
            
        })
    .catch(error => res.status(400).json({ message: "erreur" })) 
};

exports.deleteComment = (req, res, next) => {
    db.Comment.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé.'}))
        .catch(error => res.status(400).json({ error: 'Problème_suppression_commentaire !' }));
};