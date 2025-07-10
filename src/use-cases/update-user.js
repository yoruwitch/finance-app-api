import { EmailAlreadyInUseError } from "../errors/user.js";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/create-user-by-email.js";
import { PostgresUpdateUserRepository } from "../repositories/postgres/update-user.js";
import bcrypt from "bcrypt";

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        // se o email está sendo atualizado, verificar se está em uso

        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository();

        const userWithProvidedEmail =
            await postgresGetUserByEmailRepository.execute(
                updateUserParams.email,
            );

        if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
            throw new EmailAlreadyInUseError(updateUserParams.email);
        }

        // criar o objeto do usuário a ser atualizado
        const user = { ...updateUserParams };

        // se a senha for atualizada, criptografá-la
        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            );
            user.password = hashedPassword;
        }

        // chamar o repository para atualizar o usuário
        const postgresUpdateUserRepository = new PostgresUpdateUserRepository();

        const updatedUser = await postgresUpdateUserRepository.execute(
            userId,
            user,
        );

        return updatedUser;
    }
}
