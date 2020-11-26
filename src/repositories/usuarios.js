const database = require ('../utils/database');

const adicionarUsuario = async  (usuario) => {
	const { nome, email, senha} = usuario;
	const query = {
		text: `INSERT INTO usuarios  (
			nome,
			email,
			senha
		) VALUES ($1, $2, $3) RETURNING *;`,
		values: [nome, sobrenome, email, senha],
	};
	const result = await database.query(query);
	return result.rows.shift();
};
const atualizarUsuario = async (usuario) => {
	const { id, nome, email, senha} = usuario;
	const query = { 
		text: `UPDATE usuarios SET nome = $1,
		email = $2,
		senha = $3 WHERE id = $4
		RETURNING *`,
		values: [nome,  email, senha, id],
	};
	const result = await database.query(query);

	return result.rows.shift();
};

module.exports = {
	adicionarUsuario,
	atualizarUsuario
}

