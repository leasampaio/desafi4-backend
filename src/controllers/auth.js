const jwt = require('jsonwebtoken');
const response = require ('./responses');
const Senha = require('../utils/password');
const Usuarios = require('../repositories/usuarios');

require('dotenv').config();

const autenticar = async (ctx) => {
	const {email = null, senha = null} = ctx.request.body;

	if(!email || !senha){
		return response(ctx, 400, {mensagem: 'Você precisa digritar um e-mail e senha!'});
	}
	
	const usuario = await Usuarios.obterUsuariosPorEmail(email);

	if(usuario){
		const comparison = await Senha.check(senha, usuario.senha);
		if(comparison){
			const token = jwt.sign(
				{ id: usuario.id, email: usuario.email },
				process.env.JWT_SECRET || 'cubos',
				{
					expiresIn: '1h',
				}
			);
			return response(ctx, 200, { token });
		}
		else{
			return response(ctx, 200, { mensagem: "Senha incorreta!"} );
		}
	}
	return response(ctx, 200, { mensagem: "Email incorreto!"} );
		
}

module.exports = autenticar;