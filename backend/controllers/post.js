const db = require('../models');
const Post = require("..models/post");
const User = require("../models/user");
const jwt = require("jsonwebtoken");


exports.createPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "RANDON_SECRET_KEY");
    const userId = decodedToken.userId;
    
    Post.create({
        UserId: userId,
        content: req.body.content,
        image: ( req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null )
    })
        .then(post => res.status(201).json({ message: 'Post créé' }))
        
        .catch(error => res.status(400).json({ message: 'erreur création post' }))
}

exports.deletePost = (req, res, next) => {
    Post.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Post supprimé'}))
        .catch(error => res.status(400).json({ error: 'Problème_suppression_post' }));
};

exports.getAllPosts = (req, res, next) => {
    Post.findAll({
        include: {
            model: db.User,
            attributes: ["name", "role", "image"]
        },
        order: [
            ['createdAt', 'DESC']
      ],
    })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(500).json({ error }))
}

exports.getAllComments = (req, res, next) => {
    db.Comment.findAll({
        where: { PostId: req.params.id},
        include: {
            model: db.User,
            attributes: ["name", "role", "image"]
        }
    }) 
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(500).json({ error }))
}