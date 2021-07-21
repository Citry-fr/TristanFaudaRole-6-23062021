//Importation d'express et initialisation d'un router avec express
const express = require('express');
const router = express.Router();

//Importation des middleware
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Importation du controleur sauce
const saucesCtrl = require('../controllers/sauces');

//Initialisation des différentes routes sauces
router.get('/', auth, saucesCtrl.getAllSauces);
router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.post('/:id/like', auth, saucesCtrl.likeSauce);

//Exportation du router
module.exports = router;