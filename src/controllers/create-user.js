import validator from "validator";
import { EmailAlreadyInUseError } from "../errors/user.js";
import {
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    emailAlreadyInUseResponse,
    invalidPasswordResponse,
    badRequest,
    created,
    internalServerError,
} from "../controllers/helpers/index.js";

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            //  validar a requisão (campos obrigatórios,tamanho da senha e email)
            const requiredFields = [
                "first_name",
                "last_name",
                "email",
                "password",
            ];

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({ message: `Missing param: ${field}` });
                }
            }

            // validando o email com o Validator(lib externa)
            const emailIsValid = checkIfEmailIsValid(params.email);
            if (!emailIsValid) {
                return emailAlreadyInUseResponse();
            }

            // validando a senha
            const passwordIsValid = checkIfPasswordIsValid(params.password);
            if (!passwordIsValid) {
                return invalidPasswordResponse();
            }
            const passwordIsNotValid = validator.isStrongPassword(
                params.password,
            );
            if (!passwordIsNotValid) {
                return invalidPasswordResponse();
            }

            // chamar o use case (agora com injeção de dependência)
            const createdUser = await this.createUserUseCase.execute(params);

            //retornar a resposta para o usuário (status code)
            return created(createdUser);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }
            console.error(error);
            return internalServerError();
        }
    }
}
