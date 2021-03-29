require('dotenv').config;
const db = require('../models');
const Comment = require('../models/Comment');
const jwt = require('jsonwebtoken');

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