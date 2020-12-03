const { query } = require('../utils/database');
const database = require ('../utils/database');

const adicionarClientes = async(cliente) => {
	const query = {
		text: `INSERT INTO clientes(
			nome, 
			cpf,
			email	
		)VALUES ($1,$2, $3 )RETURNING *;`,
		values: [cliente.nome, clente.cpf, cliente.email],
	};
	const result = await database.query(query);
	return result.rows.shift();

};
const editarCliente = async (cliente) => {
		const query = {
		text: `UPDATE clientes 
		SET nome = $1,
		cpf = $2,
		email = $3,
		WHERE idCliente = $4
		RETURNING *`,
		values: [cliente.nome, cliente.cpf, cliente.email, cliente.idCliente],
	};
	const result = await database.query(query);
	return result.rows.shift();

};

const listarClientes = async (usuario)=>{
	query = {
		text: `SELECT * FROM clientes 
		WHERE idusuario = $1
		LIMIT 10
		OFFSET $2`,
		valueS: [usuario.idUsuario, cliente.offset]
	};
	const result = await database.query(query);
	return result.rows.shift();

};
const listarClientesPorID = async (id)=>{
	query = {
		text: `SELECT * FROM clientes 
		WHERE id = $1		`,
		valueS: [id]
	};
	const result = await database.query(query);
	return result.rows.shift();

};
const buscarCliente = async(busca) => {
	const query = {
		text: `SELECT * FROM cliente 
		WHERE 
		idusuario = $1 AND 
		(nome LIKE $2 or email LIKE $2 or cpf LIKE $2)
		LIMIT limite= $3
		OFFSET offser =$4`,
		values: [busca.idUsuario, `%${busca.busca}%`, busca.clientesPorPagina, busca.offset]
	}
	const result = await database.query(query);
	return result.rows.shift();
}
const retornarCliente = async (email) => {
	const query = {
		text: `SELECT * FROM clientes WHERE email = $1`,
		values: [email],
	};
	const result = await Database.query(query);

	return result.rows.shift();
};
const verificaClienteEstaAssociadoAoUsuario = async (IDs) => {
	const query = {
		text: `SELECT * from clientes
		WHERE
			idcliente = $1
			AND
			idusuario = $2`,
		values: [IDs.idCliente, IDs.idUsuario],
	};

	const result = await Database.query(query);

	return result.rows;
};

module.exports = { 
	adicionarClientes,
	listarClientes,
	editarCliente, 
	buscarCliente,
	listarClientesPorID, 
	retornarCliente,
	verificaClienteEstaAssociadoAoUsuario
}