import { v4 as uuidv4 } from "uuid";
import { UserNotFound } from "../../errors/user";

export class CreateTransactionUseCase {
    constructor(createTransactionRepository, getUserByIdRepository) {
        this.createTransactionRepository = createTransactionRepository;
        this.getUserByIdRepository = getUserByIdRepository;
    }

    async execute(createTransactionParams) {
        // validar se o usuário realmente existe
        const userId = createTransactionParams.userId;

        const user = await this.getUserByIdRepository.execute(userId);

        if (!user) {
            throw new UserNotFound(userId);
        }

        const transactionId = uuidv4();

        const transaction = await this.createTransactionRepository.execute({
            ...createTransactionParams,
            id: transactionId,
        });

        return transaction;
    }
}
