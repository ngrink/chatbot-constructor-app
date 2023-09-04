import { ChannelCore } from "../modules/channels/channel.core";
import { ChannelService } from "./modules/channels/channel.service";
import { ConfigService } from "./modules/configs/config.service";


export class Test {
    static async testAPI() {
        let channels = await ChannelService.getAllChannels();
        let configs = await ConfigService.getAllConfigs();
        let config = await ConfigService.getConfigByChatbotId("6285237e079712bc9acee92e");

        console.log('Channels: ', channels);
        console.log('Configs: ', configs);
        console.log('Config: ', config);
    };

    static async testChannelConnections() {
        await ChannelCore.connectAllChannels();
    }
}
