import { ApiError } from '../../api.exceptions';

export class ProjectError extends ApiError {
    static ProjectNotFound() {
        return ApiError.NotFound(`Project not found`);
    }
}
