import { CreateUserUseCase } from "../use-cases/create-user.js";
import validator from "validator";
import { badRequest, created, internalServerError } from "./helpers.js";

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
            const emailIsValid = validator.isEmail(params.email);
            if (!emailIsValid) {
                return badRequest({
                    message: "Email must follow the format: user@example.com",
                });
            }

            // validando a senha
            const passwordIsValid = validator.isStrongPassword(params.password);
            if (!passwordIsValid) {
                return badRequest({
                    message:
                        "Password must include at least 8 characters, one uppercase letter, one lowercase letter, one number, and one symbol.",
                });
            }

            // chamar o use case
            const createUserUseCase = new CreateUserUseCase();

            const createdUser = await createUserUseCase.execute(params);

            //retornar a resposta para o usuário (status code)
            return created(createdUser);
        } catch (error) {
            console.error(error);
            return internalServerError();
        }
    }
}
