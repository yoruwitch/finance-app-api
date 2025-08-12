import * as userRepository from "../../repositories/postgres/index.js";
import {
    GetUserByIdUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserByIdUseCase,
} from "../../use-cases/index.js";
import {
    GetUserByIdController,
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
} from "../../controllers/index.js";

export const makeGetUserByIdController = () => {
    const getUserByIdRepository =
        new userRepository.PostgresGetUserByIdRepository();

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

    return getUserByIdController;
};

export const makeCreateUserController = () => {
    const getUserByEmailRepository =
        new userRepository.PostgresGetUserByEmailRepository();

    const createUserReposistory =
        new userRepository.PostgresCreateUserRepository();

    const createUserUseCase = new CreateUserUseCase(
        getUserByEmailRepository,
        createUserReposistory,
    );

    const createUserController = new CreateUserController(createUserUseCase);

    return createUserController;
};

export const makeUpdateUserController = () => {
    const getUserByEmailRepository =
        new userRepository.PostgresGetUserByEmailRepository();
    const updateUserRepository =
        new userRepository.PostgresUpdateUserRepository();

    const updateUserUseCase = new UpdateUserUseCase(
        updateUserRepository,
        getUserByEmailRepository,
    );

    const updateUserController = new UpdateUserController(updateUserUseCase);
    return updateUserController;
};

export const makeDeleteUserController = () => {
    const deleteUserRepository =
        new userRepository.PostgresDeleteUserRepository();

    const deleteUserUseCase = new DeleteUserByIdUseCase(deleteUserRepository);

    const deleteUserController = new DeleteUserController(deleteUserUseCase);
    return deleteUserController;
};
