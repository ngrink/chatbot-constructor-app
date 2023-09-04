import { ConfigService } from './config.service';


export class ConfigController {
    static async getConfig(req, res, next) {
        try {
            const { projectId } = req.params;

            const data = await ConfigService.getConfig(projectId);
            res.status(200).json(data);
        } catch (e) {
            next(e);
        }
    }

    static async updateConfig(req, res, next) {
        try {
            const { projectId } = req.params;
            const { flows, nlu, database, newsletters } = req.body;

            await ConfigService.updateConfig(projectId, {flows, nlu, database, newsletters});
            res.status(200).json("OK");
        } catch (e) {
            next(e);
        }
    }

    static async publishConfig(req, res, next) {
        try {
            const { projectId } = req.params;

            await ConfigService.publishConfig(projectId);
            res.status(200).json("OK");
        } catch (e) {
            next(e);
        }
    }
}
