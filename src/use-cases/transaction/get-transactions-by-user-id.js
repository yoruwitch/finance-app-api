import { UserNotFoundError } from "../../errors/user";

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
            throw new UserNotFoundError(params.useId);
        }

        const transactions =
            await this.getTransactionsByUserIdRepository.execute(params.userId);

        return transactions;
    }
}
