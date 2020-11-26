const database = require('./database');

/**
 * criação das querys das tabelas
 */
const schema = {
	1: `CREATE TABLE IF NOT EXISTS usuarios(
		id SERIAL PRIMARY KEY,
		nome VARCHAR(255) NOT NULL,
		email VARCHAR(255) NOT NULL,
		senha VARCHAR(255) NOT NULL
	);
	INSERT INTO usuarios(nome, email, senha) VALUES('Cubos Academy', 'admin@cubos.academy', '$2y$10$fhS97pz7JN24s9Ncr3wWx.IcyICfKXp1QzW46o7AXTzO.pPvMx.V6');`,
	2: `CREATE TABLE IF NOT EXISTS clientes(
		id SERIAL PRIMARY KEY,
		idUser VARCHAR (50) NOT NULL,
		nome VARCHAR(255) NOT NULL,
		email VARCHAR(100) NOT NULL,
		cpf VARCHAR(50) NOT NULL,
		tel VARCHAR(50) NOT NULL,
	);
	INSERT INTO clientes(idUser, nome, email, cpf, tel) VALUES(1, 'Client Test', 'teste@cubos.academy', '00000000000', '71991234567');`,
	3: `CREATE TABLE IF NOT EXISTS cobrancas(
		id SERIAL PRIMARY KEY,
		idCliente VARCHAR (50) NOT NULL,
		descricao TEXT NOT NULL,
		valor INT NOT NULL,
		vencimento DATE NOT NULL,
		pagamento DATE NOT NULL
	);
	INSERT INTO cobrancas(idCliente, descricao, valor, vencimento, pagamento) VALUES(1, 'Cobrança referente a parcela do carro', 50000, '24-12-2020', '12-12-2020');`
};

/**
 * Função de dropar tabelas no banco
 */
const drop = async (nomeTabela) = {
	if(nomeTabela){
		await database.query(`DROP TABLE ${nomeTabela}`);
		console.log("Tabela Deletada");
	}
};

/**
 * Função de subir tabelas para o banco
 * @param {*} indiceTabela 
 */
const up = async (indiceTabela = null) => {
	if(!indiceTabela){
		for(const value in schema){
			const result = await database.query({ text: schema[value]});
			console.log(result);
		}
	}else{
		const result = await database.query({ text: schema[indiceTabela]});
		console.log(result);
	}
	console.log('Migração Concluída');
};

/**
 * Rode up() para subir todas as tabelas ou up(indiceDaTabela) para subir uma tabela específica
 * Rode drop("nomeDaTabela") para excluir uma das tabela armazenadas no banco 
 */

//up();
//up(1);
//drop('users');