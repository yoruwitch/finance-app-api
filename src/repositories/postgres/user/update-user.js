import { PostgresHelper } from "../../../db/postgres/helper.js";

export class PostgresUpdateUserRepository {
    async execute(userId, updateUserParams) {
        const updateFields = []; // [first_name = $1]
        const updateValues = []; // [Evelyn, Fernandes]

        Object.keys(updateUserParams).forEach((key) => {
            // se refere a posição da lista de parâmetros, por ex: $1 é first_name, $2 é last_name
            // key é o nome de cada propriedade(campo) do objeto updateUserParams
            updateFields.push(`${key} = $${updateValues.length + 1}`);
            updateValues.push(updateUserParams[key]);
        });

        updateValues.push(userId);

        const updateQuery = `
        UPDATE users 
        SET ${updateFields.join(",")} 
        WHERE id = $${updateValues.length}
        RETURNING *
        `;

        // first_name = $1, last_name = $2

        const updatedUser = await PostgresHelper.query(
            updateQuery,
            updateValues,
        );
        return updatedUser[0];
    }
}
