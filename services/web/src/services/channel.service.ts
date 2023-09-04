import { $axios } from '@utils/axios';
import { IChannel } from '@ts/channel.types';


class ChannelService {
    static async getChannels(projectId: string) {
        const res = await $axios.get<IChannel[]>(`/projects/${projectId}/channels`, {params: {projectId}})
        return res.data;
    }

    static async addChannel(projectId: string, type: string, auth: object) {
        const res = await $axios.post<IChannel>(`/projects/${projectId}/channels`, {projectId, type, auth})
        return res.data;
    }

    static async removeChannel(projectId: string, channelId: string) {
        await $axios.delete(`/projects/${projectId}/channels/${channelId}`)
    }

    static async enableChannel(projectId: string, channelId: string) {
        await $axios.post(`/projects/${projectId}/channels/${channelId}/enable`)
    }

    static async disableChannel(projectId: string, channelId: string) {
        await $axios.post(`/projects/${projectId}/channels/${channelId}/disable`)
    }
}

export { ChannelService };
