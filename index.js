const Koa = require("koa");
const bodyParser = require ("koa-bodyparser");
const router = require ("./src/routes"); 
require('dotenv').config();
const port = process.env.PORT!= undefined ? process.env.PORT: 8081; //definindo a porta
const server = new Koa();

server.use(bodyParser());
server.use(router.routes()); 

server.listen(port, console.log("Rodando!") );