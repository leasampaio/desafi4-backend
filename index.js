require('dotenv').config();

const Koa = require("koa");
const bodyParser = require ("koa-bodyparser");
const router = require ("./src/routes"); 

const server = new Koa();

const port = process.env.PORT || 8081; //definindo a porta


server.use(bodyParser());
server.use(router.routes()); 

server.listen(port, console.log("Rodando!"));