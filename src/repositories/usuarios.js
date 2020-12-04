const database = require ('../utils/database');

const adicionarUsuario = async  (usuario) => {
	const { nome, email, senha, deletado=false} = usuario;
	const query = {
		text: `INSERT INTO users (
			nome,
			email,
			senha,
			deletado 
			
		) VALUES ($1, $2, $3, $4) RETURNING *;`,
		values: [nome, email, senha, deletado],
	};
	const result = await database.query(query);
	return result.rows.shift();
};
const atualizarUsuario = async (usuario) => {
	const { id, nome, email, senha} = usuario;
	const query = { 
		text: `UPDATE users SET nome = $1,
		email = $2,
		senha = $3 WHERE id = $4
		RETURNING *`,
		values: [nome,  email, senha, id],
	};
	const result = await database.query(query);

	return result.rows.shift();
};
const obterUsuariosPorEmail = async (email = null) => {
	if (!email) {
		return null;
	}

	const query = {
		text: `SELECT * 
		FROM users 
		WHERE email = '$1' `,
		values: [email]

	};
	const result = await database.query(query);
	return result.rows.shift();
};

module.exports = {
	adicionarUsuario,
	atualizarUsuario, 
	obterUsuariosPorEmail
}

