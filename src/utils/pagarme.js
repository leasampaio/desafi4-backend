const axios = require('axios');

require('dotenv').config();
const key = process.env.PAGARME_APIKEY;

const criarBoleto = async (usuario) => {
	try {
		const boleto = await axios.post('https://api.pagar.me/1/transactions', {
			api_key: key,
			amount: usuario.valor,
			payment_method: 'boleto',
			soft_descriptor: usuario.descricao,
			boleto_expiration_date: usuario.vencimento,
			customer: {
				external_id: usuario.idCliente,
				name: usuario.nome,
				email: usuario.email,
				country: 'br',
				type: 'individual',
				documents: [{ type: 'cpf', number: usuario.cpf }],
				
			},
		});

		return boleto;
	} catch (err) {
		return err.response.data.errors;
	}
}

module.exports = {criarBoleto};