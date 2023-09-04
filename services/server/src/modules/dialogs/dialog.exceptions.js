import { ApiError } from '#root/api.exceptions';

export class DialogError extends ApiError {
    static DialogNotFound() {
        return ApiError.NotFound(`Dialog not found`);
    }
}
