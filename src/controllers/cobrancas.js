const bd = require('pg');
const Teste = require ("../repositories/cobrancas");

//let usuarios = [];
const listarCobrancas = async(ctx) => {
	const cobranca = await Teste.listarCobrancas();
	console.log(cobranca);
	ctx.body = listarCobrancas.rows;
}
module.exports = { listarCobrancas }
//const criarUsuario 