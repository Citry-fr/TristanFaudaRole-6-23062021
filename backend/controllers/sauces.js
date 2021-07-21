//Importation du schéma sauce
const Sauce = require('../models/Sauce');
//Importation du package FileSystem
const fs = require('fs');

//Route pour récupérer toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => {
            res.status(200).json(sauces);
        })
        .catch(error => res.status(400).json({ error }));
};

//Route pour créer une sauce
exports.createSauce = (req, res, next) => {    
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Post sauvegardé !' }))
        .catch(error => res.status(400).json({ error }));
};

//Route pour récupérer une sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

//Route pour modifier une sauces
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? 
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id}, {...sauceObject, _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

//Route pour récupérer toutes le sauces
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then( sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet Supprimé' }))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));
}

//Route pour modifier une sauce selon le type de like
exports.likeSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            const {userId, like} = req.body;
            let index = -1;
            switch (like) {
                case 1:
                    sauce.usersLiked.push(userId);
                    sauce.likes++
                    break;          
                case -1:
                    sauce.usersDisliked.push(userId);
                    sauce.dislikes++
                    break;
                case 0:
                    index = sauce.usersDisliked.indexOf(userId);
                    if(index > -1){
                        sauce.usersDisliked.splice(index, 1);
                        sauce.dislikes--;
                    }
                    index = sauce.usersLiked.indexOf(userId);
                    if(index > -1) {
                        sauce.usersLiked.splice(index, 1);
                        sauce.likes--;
                    }
                    break;
                default:
                    break;
            }
            sauce.save()
                .then(() => res.status(201).json({ message: 'Post sauvegardé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}
