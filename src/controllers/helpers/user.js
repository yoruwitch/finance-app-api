import { badRequest } from "./http.js";
import validator from "validator";

export const invalidPasswordResponse = () => {
    return badRequest({
        message:
            "Password must include at least 8 characters, one uppercase letter, one lowercase letter, one number, and one symbol.",
    });
};

export const emailAlreadyInUseResponse = () => {
    return badRequest({
        message: "Email must follow the format: user@example.com",
    });
};

export const invalidIdResponse = () => {
    return badRequest({
        message: "The provided id is not valid.",
    });
};

export const checkIfPasswordIsValid = () => checkIfPasswordIsValid.length >= 6;

export const checkIfEmailIsValid = (email) => validator.isEmail(email);
