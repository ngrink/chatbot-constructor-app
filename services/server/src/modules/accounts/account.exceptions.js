import { ApiError } from "#root/api.exceptions";


export class AccountError extends ApiError {
    static UserAlreadyExists() {
        return ApiError.BadRequest(`User with that email already exists`);
    }

    static ConfirmPasswordDoNotMatch() {
        return ApiError.BadRequest(`Confirm password do not match`);
    }

    static PasswordResetTokenNotValid() {
        return ApiError.BadRequest(`Password reset token is not valid`);
    }

    static CurrentPasswordIsIncorrect() {
        return ApiError.BadRequest(`Current password is incorrect`);
    }
}
