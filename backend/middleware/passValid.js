//Importation de jsonwebtoken
const passwordValidator = require('password-validator');

const schema = new passwordValidator();

schema
    .is().min(6)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)
    .has().not().spaces();

//Création du middleware de vérification de token utilisateur
module.exports = (req, res , next) => {
    try {
        const password = req.body.password
        if (!schema.validate(password)) {
            throw 'Invalid Password Schema';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
}