import { ApiError } from "#root/api.exceptions";

export class CoreMiddleware {
    static async coreOnly(req, res, next) {
        try {
            const core_key = req.headers['x-core-key'];

            if (!core_key) {
                next(ApiError.Forbidden());
            }
            if (core_key != process.env.SERVICE_CORE_ACCESS) {
                next(ApiError.Forbidden());
            }

            next();
        } catch (e) {
            next(ApiError.Forbidden())
        }
    }
}
