const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Réponse test');
})

server.listen(process.env.PORT || 3000);