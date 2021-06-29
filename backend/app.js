const express = require('express');

const app = express();

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

//3MMqF0NeaoOltK3q