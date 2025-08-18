import {
    internalServerError,
    badRequest,
    checkIfIdIsValid,
    invalidIdResponse,
    created,
    validateRequiredFields,
    requiredFieldIsMissingResponse,
} from "../helpers/index.js";

import validator from "validator";
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

            const amountIsValid = validator.isCurrency(
                params.amount.toString(),
                {
                    digits_after_decimal: [2],
                    allow_negatives: false,
                    decimal_separator: ".",
                },
            );

            if (!amountIsValid) {
                return badRequest({
                    message: "The amount must be a valid currency.",
                });
            }
            const type = params.type.trim().toUpperCase();

            const typeIsValid = ["EARNING", "EXPENSE", "INVESTMENT"].includes(
                type,
            );

            if (!typeIsValid) {
                return badRequest({
                    message:
                        "The type must be either 'EARNING', 'EXPENSE' or  'INVESTMENT'.",
                });
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
