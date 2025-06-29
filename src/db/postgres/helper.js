import pg from "pg";
// Uma pool é um conjunto de conexões reutilizáveis com o banco de dados.
const { Pool } = pg;

export const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
});

export const PostgresHelper = {
    query: async (query, params) => {
        const client = await pool.connect();

        const results = await client.query(query, params);

        // libera a conexeão de volta pro pool para que possa
        // ser reutilizada por outras requisições
        await client.release();
        return results.rows;
    },
};
