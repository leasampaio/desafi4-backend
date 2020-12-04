const database = require ('../utils/database');

 
const criarCobrancas = async (cobranca) => {
	const query = `INSERT INTO cobrancas
	(idcliente, descricao, valor, vencimento, pagamento, status) VALUES($1, $2, $3, $4, $5, $6)`;

	const result = await database.query(query);

	return result;
};
const listarCobrancas = async (id) => {
	const query = `SELECT * 
	FROM cobrancas
	inner join clientes
	on ;`
	const result = await database.query(query);
	return result;
}
const pagar = async (cobranca, data) => {
	const {id, idCliente, dataPagamento} =cobranca;
	const query = {
		text: `UPDATE cobrancas SET dataPagamento = $1,
		
		WHERE id = $2 and
		idCliente =$2 
		RETURNING *`,
		values: [data,id, idCliente ]
	};
	const result = await database.query(query);
	return result.rows.shift();
}



module.exports ={ criarCobrancas, listarCobrancas, pagar};