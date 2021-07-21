//Importation des différents Package requis
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');

//Configuration de dotenv
require('dotenv').config();

//Importation des routes api
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

//Connection à la base de données Mongoose
mongoose.connect(process.env.DB_URI, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//Initialisation de l'application express
const app = express();

//Utilisation de helmet pour protéger les Headers
app.use(helmet());

//Initialisation des Headers CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Utilisation de BodyParser
app.use(bodyParser.json());

//Utilisation du dossier 'images' pour stocker les images des différentes sauces
app.use('/images', express.static(path.join(__dirname, 'images')));

//Utilisation des routes api
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

//Exportation de l'application
module.exports = app;
