import { ChannelService } from './channel.service';


export class ChannelController {
  static async getProjectChannels(req, res, next) {
    try {
      const { projectId } = req.params;

      const channels = await ChannelService.getChannels({ projectId })
      res.status(200).json(channels);
    } catch (e) {
      next(e)
    }
  }

  static async addChannel(req, res, next) {
    try {
      const { projectId } = req.params;
      const { type, auth } = req.body;

      const channel = await ChannelService.addChannel(projectId, type, auth);
      res.status(201).json(channel);
    } catch (e) {
      next(e)
    }
  }

  // static async updateChannel(req, res, next) {
  //   try {
  //     const { channelId } = req.params;
  //     const { auth } = req.body;

  //     await ChannelService.updateChannel(channelId, auth);
  //     res.status(200).end();
  //   } catch (e) {
  //     next(e)
  //   }
  // }

  static async removeChannel(req, res, next) {
    try {
      const { channelId } = req.params;

      await ChannelService.removeChannel(channelId);
      res.status(200).json("OK");
    } catch (e) {
      next(e);
    }
  }

  static async enableChannel(req, res, next) {
    try {
      const { channelId } = req.params;

      await ChannelService.enableChannel(channelId);
      res.status(200).json("OK");
    } catch (e) {
      next(e);
    }
  }

  static async disableChannel(req, res, next) {
    try {
      const { channelId } = req.params;

      await ChannelService.disableChannel(channelId);
      res.status(200).json("OK");
    } catch (e) {
      next(e);
    }
  }
}
