import { ConfigService } from "#configs";
import { ChannelService } from "#channels";
import { UserService } from "#users";
import { CoreService } from "./core.service";


export class CoreController {
  static async getEnabledChannels(req, res, next) {
    try {
        const channels = await ChannelService.getChannels({ enabled: true });
        res.status(200).json(channels)
    } catch (e) {
        next(e);
    }
  }

  static async getAllConfigs(req, res, next) {
    try {
        const filter = req.query;

        const data = await ConfigService.getAllConfigs(filter);
        res.status(200).json(data);
    } catch (e) {
        next(e);
    }
  }

  static async getConfig(req, res, next) {
    try {
        const { projectId } = req.params;

        const config = await ConfigService.getConfig(projectId);
        res.status(200).json(config);
    } catch (e) {
        next(e);
    }
  }

  static async getConfigById(req, res, next) {
    try {
        const { configId } = req.params;

        const data = await ConfigService.getConfigById(configId);
        res.status(200).json(data);
    } catch (e) {
        next(e);
    }
  }

  static async handleNewMessage(req, res, next) {
    try {
      const context = req.body;

      await CoreService.handleNewMessage(context)
      res.status(201).json("OK");
    } catch (e) {
      next(e)
    }
  }
}
