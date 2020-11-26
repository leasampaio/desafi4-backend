const { query } = require('../utils/database');
const database = require ('../utils/database');

const adicionarClientes = async(cliente) => {
	const { id, nome, cpf, email} = cliente;
	const query = {
		text: `INSERT INTO clientes(
			nome, 
			cpf,
			email	
		)VALUES ($1,$2, $3 )RETURNING *;`,
		values: [nome, cpf, email],
	};
	const result = await database.query(query);
	return result.rows.shift();

};
const editarCliente = async (cliente) => {
	const { id, nome, cpf, email} = cliente;
	const query = {
		text: `UPDATE clientes SET nome = $1,
		cpf = $2,
		email = $3,
		WHERE id = $4
		RETURNING *`,
		values: [nome, cpf, email, id],
	};
	const result = await database.query(query);
	return result.rows.shift();

};

const listarClientes = async (id, limite)=>{
	query = {
		text: `SELECT * FROM clientes 
		WHERE id = $1
		LIMIT 10
		OFFSET $2`,
		valueS: [id, limite]
	};
	const result = await database.query(query);
	return result.rows.shift();

};
const buscarCliente = async(busca, limite, offset) => {
	const query = {
		text: `SELECT * FROM cliente 
		WHERE busca = $1
		LIMIT limite= $2
		OFFSET offser =$3`,
		values: [busca, limite, offset]
	}
	const result = await database.query(query);
	return result.rows.shift();
}
module.exports = { adicionarClientes,listarClientes, editarCliente, buscarCliente}