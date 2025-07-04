import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";

export class GetUserByIdController {
    async execute(httpResquest) {
        try {
            const getUserByIdUseCase = new GetUserByIdUseCase();
            const user = await getUserByIdUseCase.execute(
                httpResquest.params.userId,
            );

            return {
                statusCode: 200,
                body: user,
            };
        } catch (error) {
            console.log(error);
            // return internalServerError()
        }
    }
}
