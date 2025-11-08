// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data/dbQoyllur.json');
const middlewares = jsonServer.defaults({ static: './node_modules/json-server/public' });

server.use(middlewares);
server.use(router);
server.listen(3002, () => {
  console.log('Servidor JSON activo en http://localhost:3002/');
});
