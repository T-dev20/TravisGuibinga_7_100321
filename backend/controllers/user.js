const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        User.create ({
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
    .catch(error => res.status(500).json({ error })) 
};


exports.login = (req, res, next) => {
    User.findOne({where: { email: req.body.email } }) // on vérifie que l'e-mail entré par l'utilisateur correspond à un utilisateur existant de la base de données 
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
                        token: jwt.sign( // on utilise la fonction sign dejsonwebtoken pour encoder un nouveau token
                            {
                                userId: user.id,
                                role: user.role,
                                userName: user.name
                            },
                            "RANDON_SECRET_KEY", // on utilise une chaîne secrète de développement temporaire
                            {expiresIn: '24h'} // pour définir la durée de validité du token
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


exports.getAllUsers = (req, res, next) => {
    User.findAll()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(500).json({ error }))
}


exports.getCurrentUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "RANDON_SECRET_KEY");
    const userId = decodedToken.userId;
    console.log(userId)

    User.findOne({ where: { id: userId } })
        .then(user => {
            res.status(200).json({
                UserName: user.name,
                job: user.job,
                image_profil: user.image_profil,
                email: user.email
            });
        })
        .catch(error => res.status(500).json({ error: 'erreur bdd' }))
}


exports.modifyUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "RANDON_SECRET_KEY");
    const userId = decodedToken.userId;
    console.log(userId)

    User.findOne({ where: { id: userId } })
        .then(user => {
            user.update({
                image_profil: ( req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null )
            })
            .then(() => res.status(200).json({ message: 'Utilisateur modifié !' }))
            .catch(error => res.status(400).json({ error: 'Impossible de mettre à jour !' }));
        })
        .catch(error => res.status(404).json({ error: 'Utilisateur non trouvé !' }))
  };