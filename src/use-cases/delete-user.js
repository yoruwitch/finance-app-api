import { PostgresDeleteUserRepository } from "../repositories/postgres/delete-user.js";

export class DeleteUserByIdUseCase {
    async execute(userId) {
        const postgresDeleteUserRepository = new PostgresDeleteUserRepository();

        const deletedUser = await postgresDeleteUserRepository.execute(userId);

        return deletedUser;
    }
}
