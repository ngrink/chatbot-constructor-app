import { ApiError } from '#root/api.exceptions';

export class UserError extends ApiError {
    static UserNotFound() {
        return ApiError.NotFound(`User not found`);
    }
}
