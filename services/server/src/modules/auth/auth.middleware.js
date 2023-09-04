import { AuthError } from './auth.exceptions';
import { AuthServiceToken } from './auth.service.token';


export class AuthMiddleware {
    static async authorized(req, res, next) {
        try {
            const accessToken = req.header('Authorization').split(" ")[1];
            if (!accessToken) {
                next(AuthError.Unauthorized());
            }
            const accountData = await AuthServiceToken.verifyAccessToken(accessToken);
            if (!accountData) {
                next(AuthError.Unauthorized());
            }
            req.account = accountData;
            next();
        } catch (e) {
            next(AuthError.Unauthorized())
        }
    }

    static hasRole(role) {
        return async function(req, res, next) {
            try {
                if (req.account?.roles.includes('ADMIN')) {
                  next();
                }
                if (!req.account?.roles.includes(role)) {
                    next(AuthError.Forbidden());
                }
                next();
            } catch (e) {
                next(AuthError.Forbidden())
            }
        }
    }

    static async activated(req, res, next) {
        try {
            if (!req.account?.isActivated) {
                next(AuthError.Forbidden("Account is not activated"));
            }
            next();
        } catch (e) {
            next(AuthError.Forbidden("Account is not activated"))
        }
    }
}
