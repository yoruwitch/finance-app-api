import { ok, internalServerError } from "../controllers/helpers/http.js";
import {
    checkIfIdIsValid,
    invalidIdResponse,
    userNotFoundResponse,
} from "./helpers/user.js";

export class GetUserByIdController {
    constructor(getUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase;
    }

    async execute(httpRequest) {
        try {
            const isIdValid = checkIfIdIsValid(httpRequest.params.userId);

            if (!isIdValid) {
                return invalidIdResponse();
            }

            const user = await this.getUserByIdUseCase.execute(
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
