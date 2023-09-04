import { ApiError } from '#root/api.exceptions';


export class ConfigError extends ApiError {
    static ConfigNotFound() {
        return ApiError.NotFound(`Config not found`);
    }
}
