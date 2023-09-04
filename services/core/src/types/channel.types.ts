import { VK } from 'vk-io';
import { IResponse } from "./response.types";


export interface IAdapter {
    connect(channelAuth: IChannelAuth, channelContext: IChannelContext): Promise<ChannelObject>,
    disconnect(channelId: string): void,
    handleEvent(channelContext: IChannelContext): (context: any) => void,
    performResponse(context: any, response: IResponse): void
}

export interface IChannelAuth {
    token: string,
    groupId?: number
}

export interface IChannelContext {
    chatbotId: string,
    channelId: string,
    channelType: ChannelType
}

export type ChannelType = "vk" | "telegram";
export type ChannelObject = VK;
