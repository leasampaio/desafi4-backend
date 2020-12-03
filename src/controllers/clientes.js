const database = require('../repositories/clientes');
const response = require ('./responses');

const novoCliente = async (ctx) => {
	if (!ctx.state.idUsuario) {
		return response(ctx,400, {mensagem : "Faça login para continuar!"});
	}
	const {nome = null, cpf = null, email = null} = ctx.request.body;
	const { idUsuario } = ctx.state;
	const cliente = await database.retornarCliente(email);
	if(!nome || !cpf || email){
		response(ctx, 400, { mensagem: "Passe o nome, CPF e e-mail do cliente!"});
	}
	else if(cliente){
		return response(ctx, 400, { mensagem:  "Cliente já está cadastrado!"});
	}

	const newClient = { nome, cpf, email, idUsuario};
	const query = await database.adicionarClientes(newClient);
	return response (ctx, 201, { newClient });
}
const editarDadosCliente = async (ctx) => {
	if (!ctx.state.idUsuario) {
		return response(ctx,400,{mensagem:	'Faça login para editar um cliente.'});
	}

	const {	nome = null,cpf = null,	email = null, id = null} = ctx.request.body;
	const { idUsuario } = ctx.state;

	if (!nome || !id || !email || !cpf ) {
		response(ctx, 400, {mensagem:	'Por favor, informe todos os dados'});
	}

	const IDs = { idCliente: id, idUsuario };
	const editado = { idCliente: id, nome, email, cpf };
	const verificar = await data.verificaClienteEstaAssociadoAoUsuario(IDs);

	if (!verificar) {
		return response(ctx,403, {mensagem: "Erro! O cliente não está ligado a esse usuário!"}	);
	}
	await database.editarCliente(editado);
	return response(ctx,200, editado);
};
const buscarPorID = async (id) => {
	const cliente = await database.listarClientesPorID(id);
	return cliente;
};
const listarEBuscar = async (ctx) => {
	const { clientesPorPagina = null, offset = null, busca = null } = ctx.query;
	if (!ctx.state.idUsuario){
		return response(ctx, 400, {mensagem: 'Por favor, faça login!'});
	}
	const { idUsuario } = ctx.state;
	
	 if (clientesPorPagina && offset && busca) {
		const listaClientes = await database.buscarClientes({
			clientesPorPagina,
			offset,
			idUsuario,
			busca,
		});

		response(ctx, listaDeClientes);
	}
	else if (clientesPorPagina && offset && !busca) {
		const listaClientes = await database.listarClientes({
			clientesPorPagina,
			offset,
			idUsuario,
		});
		response(ctx, 200,  listaClientes);}
		else {
		return falhaRequisicao(
			ctx,
			'Insira corretamente todos os dados necessários',
			400
		);
	}
};




module.exports= {
 novoCliente,
 editarDadosCliente,
 buscarPorID
 
}