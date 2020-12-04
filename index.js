const Koa = require("koa");
const bodyparser = require ("koa-bodyparser");
const router = require ("./src/routes"); 

const server = new Koa();

require('dotenv').config();
const port = process.env.PORT || 8081; //definindo a porta


server.use(bodyparser());
server.use(router.routes());

server.listen(port, console.log("Rodando!"));