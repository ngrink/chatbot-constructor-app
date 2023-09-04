import { ChannelStore } from "./channel.store.js";

import { VkAdapter } from "./adapters/vk.js";
import { TelegramAdapter } from "./adapters/telegram.js";


export class ChannelCore {
    static adapters = {
      'vk': VkAdapter,
      'telegram': TelegramAdapter
    }

    static async connectChannel({
        projectId,
        id: channelId,
        type: channelType,
        auth: channelAuth
    }) {
      try {
        if (ChannelStore.isConnected(channelId)) {
            throw new Error('Channel already connected');
        }

        const adapter = ChannelCore.adapters[channelType];
        if (!adapter) {
          return
        }
        const channelContext = {projectId, channelId, channelType};
        const connection = await adapter.connect(channelAuth, channelContext);

        ChannelStore.saveConnection(channelId, channelType, connection);
        console.log(`[Core] Connected channel id:`, channelId);
      } catch (error) {
          console.log(`[Core]`, error);
      }
    }

    static async disconnectChannel(channelId) {
        try {
            const {type, connection} = ChannelStore.getConnection(channelId);
            const adapter = ChannelCore.adapters[type];
            await adapter.disconnect(connection);

            ChannelStore.removeConnection(channelId);
            console.log("[Core] Disconnected", channelId);
        } catch (error) {
            console.log(`[Core]`, error);
        }
    }

    static async connectAllChannels(channels) {
        if (!channels) return

        for (let channel of channels) {
            ChannelCore.connectChannel(channel);
        }
    }

    static async disconnectAllChannels() {
        for (let channelId of Object.keys(ChannelStore.connections)) {
            ChannelCore.disconnectChannel(channelId);
        }
    }
}
