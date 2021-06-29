const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://citry:3MMqF0NeaoOltK3q@cluster0.inyvs.mongodb.net/projetOpenClassroom?retryWrites=true&w=majority', 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json({ message: 'Requête reçue !' });
    next();
});

app.use((req, res, next) => {
    console.log('Réponse envoyée !');
});

module.exports = app;
