import { ChannelCore } from "../modules/channels/channel.core";
import { ConfigCore } from "../modules/configs/config.core";


export class APIController {
    static async connectChannel(req, res, next) {
        try {
            // const { channelId } = req.params;
            const { channel } = req.body
            await ChannelCore.connectChannel(channel);
            res.status(200).json("OK");
        } catch (e) {
            next(e);
        }
    }

    static async disconnectChannel(req, res, next) {
        try {
            const { channelId } = req.params;
            await ChannelCore.disconnectChannel(channelId);
            res.status(200).json("OK");
        } catch (e) {
            next(e);
        }
    }

    static async updateConfig(req, res, next) {
        try {
            // const { channelId } = req.params;
            const { config } = req.body
            await ConfigCore.compileAndSaveConfig(config);
            res.status(200).json("OK");
        } catch (e) {
            next(e);
        }
    }
}
