var http = require('http')
var porta = 21004
 
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('Hello Node new!')
}).listen(porta)
 
console.log('Servidor rodando na porta: '+ porta)