const http = require('http');
const app = require('./app');

/**
 * Retourne un port valide
 * @param {Number} val 
 * @returns 
 */
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
//Definie le port a utiliser
const port = normalizePort(process.env.PORT || '3000');
//Fixe le port de l'application
app.set('port', port);

/**
 * Recherche les différentes erreurs, les gère de façon appropriée, puis les enregistre dans le serveur 
 * @param {Object} error 
 */
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//Création du serveur.
const server = http.createServer(app);

//Serveur mis en écoute d'évènement 
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

//Le serveur écoute le port choisis
server.listen(port);
