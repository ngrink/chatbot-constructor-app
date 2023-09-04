import { makeAutoObservable } from "mobx";
import { makePersistable } from 'mobx-persist-store';

import { IChannels, IChatbotChannels, IChannel } from "@ts/channel.types";


class ChannelStore {
    channels: IChannels = {}

    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: 'ChannelStore',
            properties: [
                'channels',
            ],
            storage: window.localStorage
        })
    }

    addChannels(
        projectId: string,
        channels: IChatbotChannels
    ) {
        this.channels[projectId] = channels;
    }

    addChannel(
        projectId: string,
        channelId: string,
        channel: IChannel
    ) {
        if (!this.channels[projectId]) {
            this.channels[projectId] = {}
        }
        this.channels[projectId][channelId] = channel;
    }

    removeChannel(
        projectId: string,
        channelId: string
    ) {
        delete this.channels[projectId][channelId]
    }

    enableChannel(
        projectId: string,
        channelId: string
    ) {
        this.channels[projectId][channelId].enabled = true
    }

    disableChannel(
        projectId: string,
        channelId: string
    ) {
        this.channels[projectId][channelId].enabled = false
    }
}

export { ChannelStore };
