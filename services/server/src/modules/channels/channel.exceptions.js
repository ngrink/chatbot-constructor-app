import { ApiError } from '#root/api.exceptions';

export class ChannelError extends ApiError {
    static ChannelNotFound() {
        return ApiError.NotFound(`Channel not found`);
    }
}
