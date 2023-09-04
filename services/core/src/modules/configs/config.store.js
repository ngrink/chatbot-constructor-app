export class ConfigStore {
    static configs = {}

    static async setConfig(projectId, config) {
        ConfigStore.configs[projectId] = config;
        // TODO: next save to redis or memcached
    }

    static async getConfig(projectId) {
        return ConfigStore.configs[projectId];
        // TODO: next get compiled config from redis
    }
}
