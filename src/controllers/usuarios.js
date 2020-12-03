const response = require("./responses");
const database = require("../repositories/usuarios");
const Senha = require("../utils/password");



const cadastrarUsuario = async (ctx) => {
	const {email = null, nome = null, senha } = ctx.request.body;
	
	
	if(!email || !nome ){
		response(ctx, 400, {message: " Insira nome e e-mail!"});		
	}
	const user = await database.obterUsuariosPorEmail(email);
	if(user){
		return response(ctx, 400, {message: "Pessoa já está cadastrada!"} );
	}
	const hash = await Senha.encrypt(senha);
	const newUser = { 
		nome, 
		email, 
		senha:hash
	};
	const query = await database.adicionarUsuario(newUser);
	return response( ctx, 200, query);
};


module.exports= {cadastrarUsuario}