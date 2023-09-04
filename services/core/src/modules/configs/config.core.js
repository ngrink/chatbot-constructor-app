import { ConfigCompiler } from "./config.compiler.js";
import { ConfigStore } from "./config.store.js";


export class ConfigCore {
    static async compileAndSaveConfigs(configs) {
        if (!configs) return

        for (let config of configs) {
            ConfigCore.compileAndSaveConfig(config);
        }
    }

    static async compileAndSaveConfig(config) {
        if (!config) return

        config = ConfigCompiler.compile(config);
        ConfigStore.setConfig(config.projectId, config);
    }
}
