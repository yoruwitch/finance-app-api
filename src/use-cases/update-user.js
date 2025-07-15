import { EmailAlreadyInUseError } from "../errors/user.js";
import bcrypt from "bcrypt";

export class UpdateUserUseCase {
    constructor(updateUserRepository, getUserByEmailRepository) {
        this.updateUserRepository = updateUserRepository;
        this.getUserByEmailRepository = getUserByEmailRepository;
    }
    async execute(userId, updateUserParams) {
        // se o email está sendo atualizado, verificar se está em uso

        const userWithProvidedEmail =
            await this.getUserByEmailRepository.execute(updateUserParams.email);

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

        const updatedUser = await this.updateUserRepository.execute(
            userId,
            user,
        );

        return updatedUser;
    }
}
