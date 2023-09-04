import { ChannelCore } from './modules/channels/channel.core';
import { ConfigCore } from "./modules/configs/config.core";
import { ConfigAPI } from "./modules/configs/config.api";
import { ChannelAPI } from './modules/channels/channel.api';

export class Core {
    static async run(callback) {
        let error;

        try {
            const configs = await ConfigAPI.getAllConfigs();
            await ConfigCore.compileAndSaveConfigs(configs)

            const channels = await ChannelAPI.getEnabledChannels();
            await ChannelCore.connectAllChannels(channels);
        } catch (e) {
            error = e;
        } finally {
            callback(error);
        }
    }
}
