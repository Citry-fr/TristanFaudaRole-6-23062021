const express = require('express');
const mongoose = require('mongoose');

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://citry:3MMqF0NeaoOltK3q@cluster0.inyvs.mongodb.net/projetOpenClassroom?retryWrites=true&w=majority', 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use('/api/auth', userRoutes);

module.exports = app;
