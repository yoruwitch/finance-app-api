import { ok, internalServerError } from "../controllers/helpers/http.js";
import { GetUserByIdUseCase } from "../use-cases/index.js";
import {
    checkIfIdIsValid,
    invalidIdResponse,
    userNotFoundResponse,
} from "./helpers/user.js";

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isIdValid = checkIfIdIsValid(httpRequest.params.userId);

            if (!isIdValid) {
                return invalidIdResponse();
            }

            const getUserByIdUseCase = new GetUserByIdUseCase();

            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            );

            if (!user) {
                return userNotFoundResponse();
            }

            return ok(user);
        } catch (error) {
            console.error(error);
            return internalServerError();
        }
    }
}
