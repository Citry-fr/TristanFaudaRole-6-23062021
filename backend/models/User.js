//Importation de Mongoose et Mongoose-Unique-Validator
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//Utilisation de Mongoose pour créer le Schéma user
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true }
});

//Utilisation du plugin Mongoose-Unique-Validator
userSchema.plugin(uniqueValidator);

//Exportation du schéma
module.exports = mongoose.model('User', userSchema);