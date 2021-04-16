require('dotenv').config;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const fs = require('fs');
const User = require('../models/User');

exports.signup = (req, res, next) => {
    console.log("body", req.body);
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        db.User.create ({
            email: req.body.email,
            name: req.body.name,
            job: req.body.job,
            password: hash
        })
        .then(user =>{
            res.status(201).json({ message: 'Utilisateur créé !'})
        })
        .catch(err => console.log('User_created', err))
            
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error }) 
    })
};


exports.login = (req, res, next) => {
    db.User.findOne({where: { email: req.body.email } }) // on vérifie que l'e-mail entré par l'utilisateur correspond à un utilisateur existant de la base de données 
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password) // on utilise la fonction compare de bcrypt pour comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        role: user.role,
                        token: jwt.sign( // on utilise la fonction sign dejsonwebtoken pour encoder un nouveau token
                            {
                                userId: user.id,
                                role: user.role,
                                userName: user.name
                            },
                            process.env.SECRET_KEY, // on utilise une chaîne secrète de développement temporaire
                            {expiresIn: '24h'} // pour définir la durée de validité du token
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


exports.getAllUsers = (req, res, next) => {
    db.User.findAll()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(500).json({ error }))
}


exports.getCurrentUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;
    console.log(userId)

    db.User.findOne({ where: { id: userId } })
        .then(user => {
            res.status(200).json({
                name: user.name,
                job: user.job,
                image_profil: user.image_profil,
                email: user.email
            });
        })
        .catch(error => res.status(404).json({ error: 'Utilisateur inexistant !' }))
}

exports.getOneUser = (req, res, next) => {
  const id = req.params.id;

  db.User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id
      });
    });
};


exports.modifyUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;
    console.log(userId)

    db.User.findOne({ where: { id: userId } })
        .then(user => {
            if(req.body.password==null) {
            user.update({
                 name: req.body.name,
                 job: req.body.job,
                 email: req.body.email,
                 image_profil: ( req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null )
             })
            .then(() => res.status(200).json({ message: 'Utilisateur modifié !' }))
            .catch(error => res.status(400).json({ error: 'Impossible de mettre à jour !' }));
         } else {
              bcrypt.compare(req.body.oldPassword, user.password)/* if id matches one in database, we compare the password logged in with the one linked to the user */
               .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                    bcrypt.hash(req.body.password, 10)/* hashing the password for security purposes */
                    .then(hash => {
                        user.update({
                        name: req.body.name,
                        job: req.body.job,
                        email: req.body.email,
                        password: hash
                    })
                    .then(() =>{ res.status(201).json({ message: 'Mot de passe modifié !'}) })
                    .catch(error => res.status(404).json({ error: 'Erreur modif mot de passe !' }))
                })
            })
         }
        })
        .catch(error => res.status(404).json({ error: 'Utilisateur non trouvé !' }))
  };


  exports.deleteCurrentUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;
    console.log(userId)

    db.User.findOne({ where: { id: userId } })
    .then(user => {
        if (user.id == userId || user.role == "Admin") {
            db.User.destroy({ where: { id: userId } })
            .then(() => res.status(200).json({ message: 'Compte supprimé'}))
            .catch(error => res.status(400).json({ error: 'Problème_suppression_compte' }));
        }else {
            return res.status(404).json({ message: "'Vous n'avez pas le droit de supprimé ce compte !" })
        }
    })
            
  };