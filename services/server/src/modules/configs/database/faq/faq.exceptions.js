import { ApiError } from '#root/api.exceptions';

export class FaqError extends ApiError {
    static FaqAlreadyExists() {
        return ApiError.NotFound(`Faq with that ID already exists`);
    }
}
