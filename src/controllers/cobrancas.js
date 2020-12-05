const Pagarme = require('../utils/pagarme');
const Clientes = require('./clientes');
const response = require('./responses');
const { database } = require('../utils/database');



const listar = async(ctx) => {
	const { cobrancasPorPagina = null, offset = null } = ctx.query;
	if (!ctx.state.idUsuario) {
		return response(ctx, 400, { mensgem:'Faça login para continuar!'});
	}
	const { id } = ctx.state;
	if (cobrancasPorPagina && offset) {
		const listaDeCobrancas = await database.listarCobranças(id);
		response(ctx,200,  listaDeCobrancas);
	} else {
		return response(ctx,400, {mensagem: "Informe todos os ddos para continuar"}	);
	}
}
const pagar = async (ctx) => {
	if (!ctx.state.idUsuario) {
		return response(ctx, 400, {mensagem: 'Faça login para continuar!'});
	}
	const { id = null } = ctx.request.body;
	if (id) {
		database.pagar(id);
		response(ctx, 200, {mensagem:'Paga com sucesso' } );
	} else {
		return response(ctx,{mensagem: 'Informe todos os dados para continuar!'});
	}
};
const criar = async (ctx) => {
	if (!ctx.state.idUsuario) {
		return response(ctx, 400, { mensgem:'Faça login para continuar!'});
	}

	const {	id = null,	descricao = null, valor = null,	vencimento = null} = ctx.request.body;
	const idUsuario = ctx.state.idUsuario;
	const {	nome, email, cpf, idusuario,	} = await Clientes.buscarPorID(id);
	if (idUsuario !== idusuario) {
		return response(ctx, 400, {mensagem: " Não é possível adicionar essa cbrança."})	;
	}

	const boleto = await Pagarme.criarBoleto({
		idCliente: id,
		valor,
		descricao,
		vencimento,
		nome,
		email,
		cpf
	});

	if (boleto[0]) {
		response(ctx,400, boleto);
	} else {
		await database.criarCobrancas({
			idCliente: id,
			valor,
			descricao,
			vencimento,
			linkDoBoleto: boleto.data.boleto_url,
			status: 'AGUARDANDO',
		});

		const cobranca = {
			cobranca: {
				id,
				descricao,
				valor,
				vencimento,
				linkDoBoleto: boleto.data.boleto_url,
				status: 'AGUARDANDO',
			}
		};
		return response(ctx,200, cobranca);
	}
};

module.exports = { listar, pagar, criar }
