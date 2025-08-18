import {
    internalServerError,
    invalidTypeResponse,
    checkIfIdIsValid,
    invalidIdResponse,
    created,
    validateRequiredFields,
    requiredFieldIsMissingResponse,
    checkIfAmountIsValid,
    checkIfTypeIsValid,
    invalidAmountResponse,
} from "../helpers/index.js";

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body;
            //  validar a transação
            const requiredFields = [
                "user_id",
                "name",
                "date",
                "amount",
                "type",
            ];
            const requiredFieldsValidation = validateRequiredFields(
                params,
                requiredFields,
            );

            if (!requiredFieldsValidation.ok) {
                return requiredFieldIsMissingResponse(
                    requiredFieldsValidation.missingField,
                );
            }
            // as validações de uusário, amount, type

            const userIsValid = checkIfIdIsValid(params.user_id);

            if (!userIsValid) {
                return invalidIdResponse();
            }

            const amountIsValid = checkIfAmountIsValid(params.amount);

            if (!amountIsValid) {
                return invalidAmountResponse();
            }
            const type = params.type.trim().toUpperCase();

            const typeIsValid = checkIfTypeIsValid(type);

            if (!typeIsValid) {
                return invalidTypeResponse();
            }

            const transaction = await this.createTransactionUseCase.execute({
                ...params,
                type,
            });

            return created(transaction);
        } catch (error) {
            console.log(error);
            return internalServerError(error);
        }
    }
}
