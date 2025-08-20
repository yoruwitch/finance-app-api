import { userNotFoundResponse } from "../../controllers/helpers/index.js";

export class GetTransactionsByUserIdUseCase {
    constructor(getTransactionsByUserIdRepository, getUserByIdRepository) {
        this.getTransactionsByUserIdRepository =
            getTransactionsByUserIdRepository;
        this.getUserByIdRepository = getUserByIdRepository;
    }
    async execute(params) {
        // validar se o usuário existe
        const user = await this.getUserByIdRepository(params.useId);

        if (!user) {
            return userNotFoundResponse();
        }

        const transactions =
            await this.getTransactionsByUserIdRepository.execute(params.userId);

        return transactions;
    }
}
