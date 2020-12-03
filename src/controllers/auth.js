const jwt = require('jsonwebtoken');
const response = require ('./responses');
const Senha = require('../utils/password');
const Usuarios = require('../repositories/usuarios');
const password = require('../utils/password');

require('dotenv').config();

const autenticar = async (ctx) => {
	const {email = null, senha = null} = ctx.request.body;
	if(!email){
		return response(ctx, 400, {mensagem: 'Você precisa digritar um e-mail!'});
	}
	else if(!senha){
		return response(ctx, 400, {mensagem: 'Você precisa digritar uma senha!'});
	}
	const usuario = await Usuarios.obterUsuariosPorEmail(email);

	if(usuario){
		const comparison = await Senha.check(senha, usuario.senha);
		if(comparison){
			const token = await jwt.sign(
				{ id: autor.id, email: autor.email },
				process.env.JWT_SECRET || 'cubosacademy',
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

module.exports = {autenticar};