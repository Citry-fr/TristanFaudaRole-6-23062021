//Importation d'express et initialisation d'un router avec express
const express = require('express');
const router = express.Router();

// Importation du middleware
const passValid = require('../middleware/passValid');

//Importation du controleur user
const userCtrl = require('../controllers/user');

//Initialisation des différentes routes user
router.post('/signup', passValid, userCtrl.signup);
router.post('/login', userCtrl.login);

//Exportation du router
module.exports = router;