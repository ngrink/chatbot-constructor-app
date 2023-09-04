import { $core } from "#utils/lib/axios";


export class CoreAPI {
    static async connectChannel(channelId, channel) {
      try {
        await $core.post(`/channels/${channelId}/connect`, {channel});
      } catch (e) {
        console.log(e);
      }
    }

    static async disconnectChannel(channelId) {
      try {
        await $core.post(`/channels/${channelId}/disconnect`);
      } catch (e) {
        console.log(e);
      }
    }

    static async publishConfig(configId, config) {
      try {
        await $core.post(`/config/${configId}/publish`, {config});
      } catch (e) {
        console.log(e);
      }
    }
}
