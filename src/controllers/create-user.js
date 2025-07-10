import { CreateUserUseCase } from "../use-cases/create-user.js";
import validator from "validator";
import {
    badRequest,
    created,
    internalServerError,
} from "../controllers/helpers/http.js";
import { EmailAlreadyInUseError } from "../errors/user.js";
import {
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    emailAlreadyInUseResponse,
    invalidPasswordResponse,
} from "../controllers/helpers/user.js";

export class CreateUserController {
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

            // chamar o use case
            const createUserUseCase = new CreateUserUseCase();

            const createdUser = await createUserUseCase.execute(params);

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
