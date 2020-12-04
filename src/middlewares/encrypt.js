const Senha = require ("../utils/password");
const response = require("../controllers/responses");

const encrypt =  async (ctx, next) => {
	const { senha = null } = ctx.request.body;
	if(!senha){
		return response (ctx, 400, {mensagem: "Informe todos os dados!"})
	}
	const hash = await Senha.encrypt(senha);
	ctx.state.hash = hash;
	return next ();
};

module.exports = { encrypt };