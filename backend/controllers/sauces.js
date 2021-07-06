const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => {
            res.status(200).json(sauces);
        })
        .catch(error => res.status(400).json({ error }));
};

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

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id}, {...req.body, _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

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

exports.likeSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            let likeTab = sauce.usersLiked;
            let dislikeTab = sauce.usersDisliked;
            let like = parseInt(req.query.like);
            let user = req.query.UserId;
            let index;
            switch (like) {
                case 1:
                    likeTab.push(user);
                    index = dislikeTab.indexOf(user);
                    if(index > -1) dislikeTab.splice(index, 1);
                    break;                
                case -1:
                    dislikeTab.push(user);                    
                    index = likeTab.indexOf(user);
                    if(index > -1) likeTab.splice(index, 1);
                    break;
                case 0:
                    index = dislikeTab.indexOf(user);
                    if(index > -1) dislikeTab.splice(index, 1);
                    index = likeTab.indexOf(user);
                    if(index > -1) likeTab.splice(index, 1);
                    break;
                default:
                    console.log("default");
                    break;
            }
            console.log("like :" + likeTab);
            console.log("dislike : " + dislikeTab);
            sauce.usersLiked = likeTab;
            sauce.usersDisliked = dislikeTab;
            sauce.save()
            .then(() => res.status(201).json({ message: 'Post sauvegardé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}
