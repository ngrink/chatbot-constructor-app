interface IChannels {
    [projectId: string]: IChatbotChannels
}

interface IChatbotChannels {
    [channelId: string]: IChannel
}

interface IChannel {
    id: string,
    projectId: string,
    type: string,
    auth: object,
    enabled: boolean,
    status: string,
}

export type { IChannel, IChatbotChannels, IChannels }
