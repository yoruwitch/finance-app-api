import validator from "validator";
import { UpdateUserUseCase } from "../../src/use-cases/update-user.js";
import { EmailAlreadyInUseError } from "../errors/user.js";
import {
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    emailAlreadyInUseResponse,
    invalidIdResponse,
    invalidPasswordResponse,
    badRequest,
    internalServerError,
    ok,
} from "../controllers/helpers/index.js";
export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;
            const isIdValid = validator.isUUID(userId);

            if (!isIdValid) {
                return invalidIdResponse();
            }
            const updateUserParams = httpRequest.body;

            const allowedFields = [
                "first_name",
                "last_name",
                "email",
                "password",
            ];

            const someFieldNotAllowed = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field),
            );

            if (someFieldNotAllowed) {
                return badRequest({
                    message: "Some provided field is not allowed.",
                });
            }

            // validando o email com o Validator(lib externa)
            if (updateUserParams.email) {
                const emailIsValid = checkIfEmailIsValid(
                    updateUserParams.email,
                );
                if (!emailIsValid) {
                    return emailAlreadyInUseResponse();
                }
            }

            // validando a senha
            if (updateUserParams.password) {
                const passwordIsValid = checkIfPasswordIsValid(
                    updateUserParams.password,
                );
                if (!passwordIsValid) {
                    return invalidPasswordResponse();
                }
            }

            const updateUserUseCase = new UpdateUserUseCase();
            const updatedUser = await updateUserUseCase.execute(
                userId,
                updateUserParams,
            );

            return ok(updatedUser);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }
            console.error(error);

            return internalServerError();
        }
    }
}
