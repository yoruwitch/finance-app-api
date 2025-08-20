// Esse arquivo define erros relacionados a usuários.

export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(
            `Provided email ${email} is already in use. Please use a different email.`,
        );
        this.name = "EmailAlreadyInUseError";
    }
}

export class UserNotFoundError extends Error {
    constructor(userId) {
        super(`User with ID ${userId} not found.`);
        this.name = "UserNotFound";
    }
}
