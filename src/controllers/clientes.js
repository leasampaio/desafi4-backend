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



module.exports= {
 novoCliente
}