const db = require('../models');
const jwt = require("jsonwebtoken");


exports.createPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "RANDON_SECRET_KEY");
    const userId = decodedToken.userId;
   
    db.Post.create({
        UserId: userId,
        content: req.body.content,
        image: ( req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null )
    })
        .then(post => res.status(201).json({ message: 'Post créé' }))
        .catch(error => res.status(400).json({ message: 'erreur création post' }))
};

exports.deletePost = (req, res, next) => {
    db.Post.destroy({ where: { PostId: req.params.id } })
        .then(() => res.status(200).json({ message: 'Post supprimé'}))
        .catch(error => res.status(400).json({ error: 'Problème_suppression_post' }));
};


exports.getOnePost = (req, res, next) => {
  db.Post.findOne({
    PostId: req.params.id
  })
      .then(post => res.status(200).json(post))
      .catch(error => res.status(404).json({error: error}));
};


exports.getAllPosts = (req, res, next) => {
    db.Post.findAll({
        include: {
            model: db.User,
            attributes: ["name", "role", "image_profil"]
        },
        order: [
            ['createdAt', 'DESC']
      ],
    })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(500).json({ error }))
}

exports.getAllComments = (req, res, next) => {
    db.Comment.findAll({
        where: { PostId: req.params.id},
        include: {
            model: db.User,
            attributes: ["name", "role", "image_profil"]
        }
    }) 
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(500).json({ error }))
};