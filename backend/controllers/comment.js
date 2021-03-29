require('dotenv').config;
const db = require('../models');
const Comment = require('../models/Comment');
const jwt = require('jsonwebtoken');

// exports.modifyComment = (req, res, next) => {
//   db.Comment.update({ where: { id: req.params.id } })
//       .then(comment => res.status(200).json(comment))
//       .catch(error => res.status(404).json({error: error}));
// };

exports.modifyComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;
    console.log(userId)

    db.Comment.findOne({ where: { id: req.params.id } })
        .then(post => {
            post.update(
               { content: req.body.content }
            )
            .then(() => res.status(200).json({ message: 'Commentaire modifié !' }))
            .catch(error => res.status(400).json({ error: 'Impossible de mettre à jour le commentaire!' }));
        })
        .catch(error => res.status(404).json({ error: 'Commentaire non trouvé !' }))
  };

exports.deleteComment = (req, res, next) => {
    Comment.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé.'}))
        .catch(error => res.status(400).json({ error: 'Problème_suppression_commentaire !' }));
};