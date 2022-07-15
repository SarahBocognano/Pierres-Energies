const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');

module.exports.signup = (req,res) => {

    // Récupération du nom, email et du mot de passe via la requête de l'API 
    const {name, email, password} = req.body;

    // Vérification pour voir si il n'y a pas un champ manquant
    if (!name || !email || !password) {
        res.status(400).json({message: 'Please enter all fields'})
    }

    // Recherche de l'utilisateur via l'email pour voir si il n'existe pas déjà
    User.findOne({email})
    .then(user => {
        if(user) return res.status(400).json({message: 'User already exists'})
    });

    // Création d'un nouvel utilisateur
    const newUser = new User({ name, email, password});

    // Génération d'un hash de mot de passe et des tours de sel de notre mot de passe puis sauvegarde de l'utilisateur dans la base de données avec un token unique
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err,hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save()
        .then(user => {
          jwt.sign(
            {id: user._id},
            config.get('jtwsecret'),
            {expiresIn: 3600},
            (err, token)  => {
              if(err) throw err;
              res.json({
                token,
                user: {
                  id: user._id,
                  name: user.name,
                  email: user.email
                }
              })
            }
          )
        })
      })
    })
}

module.exports.login = async (req,res) => {
    const {email, password} = req.body;
    
    if(!email || !password) {
        res.status(400).json({message: 'Please enter all fields'})
    }

    User.findOne({email})
    .then(user => {
        if(!user) return res.status(400).json({message: 'User does not exist'})
    });
        // Validation du mot de passe
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(!isMatch) return res.status(400).json({message: 'Invalid credentials'})
        });

        jwt.sign(
            { id: user._id },
            config.get('jwtsecret'),

            { expiresIn: 3600 },
            (err, token) => {
                if(err) throw err;
                res.json({
                    token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }
                });
            }
        )
};

module.exports.get_user = (req,res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
}