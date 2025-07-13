import { DeleteUserByIdUseCase } from "../use-cases/delete-user.js";
import {
    checkIfIdIsValid,
    internalServerError,
    invalidIdResponse,
    ok,
} from "./helpers/index.js";

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;

            const isIdValid = checkIfIdIsValid(userId);

            if (!isIdValid) {
                return invalidIdResponse();
            }

            const deleteUserUseCase = new DeleteUserByIdUseCase();
            const deletedUser = await deleteUserUseCase.execute(userId);

            return ok(deletedUser);
        } catch (error) {
            console.log(error);
            return internalServerError();
        }
    }
}
