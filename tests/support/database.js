require('dotenv').config()
const mariadb = require('mariadb')

// Criação do pool de conexões
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

// Função para executar SQL
async function executeSQL(sqlScript) {
    let connection
    try {
        // Obtém uma conexão do pool
        connection = await pool.getConnection()

        // Executa o comando SQL
        const result = await connection.query(sqlScript)
        console.log('Resultado:', result)

        return result; // Retorna o resultado, se necessário
    } catch (error) {
        console.error('Erro ao executar SQL:', error)
    } finally {
        if (connection) connection.release() // Garante que a conexão é liberada
    }
}

// Exportar a função para uso em outros arquivos
module.exports = { executeSQL }