//Importation de multer
const multer = require('multer');

//Définition des extension de fichier
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

/*
    Configuration de multer:
        
        destination: Indique a multer d'enregistrer les fichier dans le dossier 'images'

        filename: Indique a multer d'utiliser le nom du fichier en remplacant les espace par des underscore et ajoute un          timestamp à la fin.
*/
const storage = multer.diskStorage({
    destination: (req, file, callback) => { 
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_').split('.')[0];        
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});
//Exportation de multer configuré et indication de prise en charge d'image uniquement
module.exports = multer({ storage }).single('image');