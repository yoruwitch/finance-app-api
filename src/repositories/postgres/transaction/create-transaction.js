import { PostgresHelper } from "../../../db/postgres/helper.js";
export class PostgresCreateTransactionRepository {
    async execute(createTransactionParams) {
        const createTransaction = await PostgresHelper.query(
            `INSERT INTO transactions (id, user_id, name, date, amount, type)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
            `,
            [
                createTransactionParams.id,
                createTransactionParams.user_id,
                createTransactionParams.name,
                createTransactionParams.date,
                createTransactionParams.amount,
                createTransactionParams.type,
            ],
        );
        return createTransaction[0];
    }
}
