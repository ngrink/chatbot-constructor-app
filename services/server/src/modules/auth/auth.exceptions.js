import { ApiError } from '#root/api.exceptions';

export class AuthError extends ApiError {
    static BadCredentials() {
        return ApiError.NotFound(`Login or password is wrong`);
    }
}
