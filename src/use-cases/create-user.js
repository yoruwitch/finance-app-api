import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import {} from "../repositories/postgres/index.js";
import { EmailAlreadyInUseError } from "../errors/user.js";

export class CreateUserUseCase {
    constructor(getUserByEmailRepository, createUserReposistory) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.createUserReposistory = createUserReposistory;
    }

    async execute(createUserParams) {
        // verificar se o email já está sendo usado
        const userWithProvidedEmail =
            await this.getUserByEmailRepository.execute(createUserParams.email);

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email);
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
        const createdUser = await this.createUserReposistory.execute(user);

        return createdUser;
    }
}
