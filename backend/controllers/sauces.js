const Sauce = require('../models/Sauce');

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => {
            res.status(200).json(sauces);
        })
        .catch(error => res.status(400).json({ error }));
};

exports.createSauce = (req, res, next) => {
    const sauce = new Sauce({
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        mainPepper: req.body.mainPepper,
        heat: req.body.heat
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Post sauvegardé !' }))
        .catch(error => res.status(400).json({ error }));
};
