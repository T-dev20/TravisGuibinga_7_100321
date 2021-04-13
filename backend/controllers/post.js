require('dotenv').config;
const db = require('../models');
const jwt = require("jsonwebtoken");


exports.createPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
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
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;
    const userRole = decodedToken.role;

    db.Post.findOne({include: { 
            model: db.User,
            attributes: ["name", "role", "image_profil"]
        }, where: { id: req.params.id } })
        .then(post => {
            if (post.UserId == userId || userRole == "Admin") {
            post.destroy({where: { id: req.params.id }})
            .then(() => res.status(200).json({ message: 'Post supprimé !' }))
            .catch(error => res.status(400).json({ error: 'Impossible de supprimer le post!' }));
            }else {
                return res.status(400).json({ message: "Vous n'êtes pas autorisé(e) à supprimer ce post !"})
            }
        })
        .catch(error => res.status(404).json({ error: 'Post non trouvé !' }))
};


exports.getOnePost = (req, res, next) => {
  db.Post.findOne({include: {
            model: db.User,
            attributes: ["name", "role", "image_profil"]
        },where: { id: req.params.id }})
      .then(post => res.status(200).json(post || {} ))
      .catch(error => res.status(404).json( {} ));
};

exports.modifyPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;
    console.log(userId)

    db.Post.findOne({include: {
            model: db.User,
            attributes: ["name", "role", "image_profil"]
        },
         where: { id: req.params.id } })
        .then(post => {
            if (post.UserId == userId) {
                post.update({ 
                 content: req.body.content,
                 image: ( req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null )
             })
            .then(() => res.status(200).json({ message: 'Post modifié !' }))
            .catch(error => res.status(400).json({ error: 'Impossible de mettre à jour le post!' }));
            }else {
                return res.status(400).json({ message: "Vous n'êtes pas autorisé(e) à modififier ce post !"})
            }
        })
        .catch(error => res.status(404).json({ error: 'Post non trouvé !' }))
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
            attributes: ["email", "name", "role", "image_profil"]
        },
        order: [
            ['createdAt', 'DESC']
      ],
    })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(500).json({ error }))
};

exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;
    //console.log(userId)

    db.Post.findOne({ where: { id: req.params.id } })  // On recherche le post à commenté
        .then(post => {
            if (!post) {
                return res.status(404).json({ error: 'Post introuvable !' })
            }
            db.Comment.create({
                content: req.body.content,
                PostId: req.params.id,
                OwnerId: userId
            })
            .then(() => res.status(201).json({ message: 'Commentaire créé.' }))
            .catch(error => res.status(400).json({ error }))
        })
    .catch(error => res.status(400).json({ message: "erreur" }))
}


exports.postLike = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;
    const isliked = req.body.like

    db.Post.findOne({ where: { id: req.params.id } })

    .then(post => {
        if (!post) {
            return res.status(404).json({ error: 'Post introuvable !' })
        } else if( isliked === true ) {
            db.like_Post.findOne( { include: {
                model: db.User,
                attributes: ["id"]
                }, where: { PostId: req.params.id, OwnerId: userId } })
                .then(like => {
                    if(like) {
                        return res.status(404).json({ error: "Vous l'avez déjà liké ce post !" })  
                    } else {
                        db.like_Post.create({ PostId: req.params.id, OwnerId: userId });
                        post.update({ likes: post.likes + 1 })
                        .then(post => res.status(201).json({ message: 'Post liké' }))
                        .catch(error => res.status(500).json({ error: ' Erreur update post' })) 
                    }
                })
                .catch(error => res.status(400).json({ error }))

        } else if(isliked === false) {
            db.like_Post.findOne( { include: {
                model: db.User,
                attributes: ["id"]
                }, where: { PostId: req.params.id } })
                .then(like => {
                    if(like) {
                        db.like_Post.destroy({ where: { PostId: req.params.id, OwnerId: userId }})
                        post.update({ likes: post.likes - 1 })
                        .then(post => res.status(201).json({ message: 'Like annulé' }))
                        .catch(error => res.status(500).json({ error: ' Erreur update post' }))
                    } else {
                        return res.status(404).json({ error: "Votre like a déjà été annulé !" })
                    }
                })
                .catch(error => res.status(400).json({ error }))
        }
    })
    .catch(error => res.status(400).json({ message: "erreur destroy" }))      
}



// exports.postLike = (req, res, next) => {
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
//     const userId = decodedToken.userId;

//   switch (req.body.like) {
//     case 0:    
    
//       db.Post.findOne({include: {
//             model: db.like_Post,
//             attributes: ["PostId", "OwnerId"]
//         },
//          where: { id: req.params.id } })
//         .then(post => {
//             if (post.like_Post.OwnerId == userId) {
//                 post.update({ 
//                  likes: post.likes - 1
//              })
//             .then(() => res.status(200).json({ message: 'Vote enregistré !' }))
//             .catch(error => res.status(400).json({ error: 'Impossible de voté' }));
//             }else {
//                 return res.status(400).json({ message: "Vous n'êtes pas autorisé(e) à modififier ce post !"})
//             }
//         })
//         .catch(error => res.status(404).json({ error: 'Post non trouvé !' }))

//       db.Post.findOne({ where: { id: req.params.id } })
//         .then((post) => {
//           if (post.UserId === req.body.OwnerId ) {  // on cherche si l'utilisateur est déjà dans le tableau usersLiked
//             db.Post.updateOne({ likes: post.likes - 1 })
//               .then(() => { res.status(201).json({ message: "vote enregistré." }); }) //code 201: created
//               .catch((error) => { res.status(400).json({ error }); });
//           }
//         })
//         .catch((error) => { res.status(404).json({ error }); });
//       break;

//     case 1: 
//      db.Post.findOne({include: {
//             model: db.like_Post,
//             attributes: ["PostId", "OwnerId"]
//         },
//          where: { id: req.params.id } })
//         .then(post => {
//             if (post.UserId == post.db.like_Post.OwnerId) {
//                 post.update({ 
//                  likes: post.likes + 1
//              })
//             .then(() => res.status(200).json({ message: 'Post liké !' }))
//             .catch(error => res.status(400).json({ error: 'Impossible de liké' }));
//             }else {
//                 return res.status(400).json({ message: "Vous n'êtes pas autorisé(e) à modififier ce post !"})
//             }
//         })
//         .catch(error => res.status(404).json({ error: 'Post non trouvé !' }))
//       break;

//     default:
//       console.error("bad request");
//   }
// };