const response = require ('./responses');
const autenticar = (ctx) => {

	const {email =null, password = null}= ctx.request.body;
	if(!email){
		return response(ctx, 400, {mensagem: 'Você precisa digritar um e-mail!'});
	}
	else if(!password){
		return response(ctx, 400, {mensagem: 'Você precisa digritar uma senha!'});
	}
	return response(ctx, 200, {mensagem: 'Success!'});
}

module.exports = {autenticar};