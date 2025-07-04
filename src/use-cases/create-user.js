import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { PostgresCreateUserRepository } from "../repositories/postgres/create-user.js";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/create-user-by-email.js";

export class CreateUserUseCase {
    async execute(createUserParams) {
        // TODO: verificar se o email já está sendo usado

        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository();

        const userWithProvidedEmail =
            await postgresGetUserByEmailRepository.execute(
                createUserParams.email,
            );

        if (userWithProvidedEmail) {
            throw new Error(
                "Provied email is already in use. Please use a different email.",
            );
        }

        //gerar ID do usuário
        const userId = uuidv4();

        // criptografar a senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

        // inserir o usuário no banco de dados
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        };

        // chamar o repositório para salvar o usuário
        const postgresCreateUserRepository = new PostgresCreateUserRepository();

        const createdUser = await postgresCreateUserRepository.execute(user);

        return createdUser;
    }
}
