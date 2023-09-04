export class ChannelStore {
    static connections = {}

    static saveConnection(channelId, type, connection) {
        ChannelStore.connections[channelId] = {type, connection}
    }

    static getConnection(channelId) {
        return ChannelStore.connections[channelId];
    }

    static removeConnection(channelId) {
        delete ChannelStore.connections[channelId];
    }

    static isConnected(channelId) {
        return ChannelStore.connections.hasOwnProperty(channelId);
    }
}
