const db = require('../models');
const Comment = require('../models/Comment');
const jwt = require('jsonwebtoken');



exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "RANDON_SECRET_KEY");
    const userId = decodedToken.userId;
    //console.log(userId)

    db.Post.findOne({ where: { id: req.body.PostId } })  // On recherche le post à commenté
        .then(post => {
            if (!post) {
                return res.status(404).json({ error: 'Post introuvable !' })
            }
            db.Comment.create({
                content: req.body.content,
                PostId: req.body.PostId,
                OwnerId: userId
            })
            .then(comment => res.status(201).json({ message: 'Commentaire créé.' }))
            .catch(error => res.status(400).json({ error }))
        })
    .catch(error => res.status(400).json({ message: "erreur" }))
}


exports.modifyComment = (req, res, next) => {
  db.Comment.update({ where: { id: req.params.id } })
      .then(comment => res.status(200).json(comment))
      .catch(error => res.status(404).json({error: error}));
};


exports.deleteComment = (req, res, next) => {
    Comment.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé.'}))
        .catch(error => res.status(400).json({ error: 'Problème_suppression_commentaire !' }));
};