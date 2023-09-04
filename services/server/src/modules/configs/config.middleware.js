import { ConfigRepository } from './config.repository';
import { ConfigError } from './config.exceptions';


export class ConfigMiddleware {
    static async configOwner(req, res, next) {
        try {
            const { accountId } = req.account;
            const { configId } = req.params;

            const config = await ConfigRepository.getOne(
              { configId, accountId },
              { attributes: ["configId"] }
            )

            if (!config) {
              next(ConfigError.Forbidden());
            }
            next();
        } catch (e) {
            next(e)
        }
    }
}
