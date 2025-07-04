// Esse arquivo define erros relacionados a usuários.

export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(
            `Provided email ${email} is already in use. Please use a different email.`,
        );
        this.name = "EmailAlreadyInUseError";
    }
}
