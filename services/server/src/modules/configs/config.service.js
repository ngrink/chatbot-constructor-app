import { CoreService } from "#core";

import { ConfigRepository } from "./config.repository";
import { ConfigError } from "./config.exceptions";


export class ConfigService {
  static async createConfig(accountId, projectId) {
    const config = await ConfigRepository.create({ accountId, projectId });

    return config
  }

  static async getAllConfigs(filter) {
    const configs = await ConfigRepository.getAll(filter);

    return configs;
  }

  static async getConfig(projectId) {
    const config = await ConfigRepository.getOne({ projectId });
    if (!config) {
        throw ConfigError.ConfigNotFound();
    }

    return config;
  }


  static async getConfigById(configId) {
    const config = await ConfigRepository.getById(configId);
    if (!config) {
        throw ConfigError.ConfigNotFound();
    }

    return config;
  }

  static async updateConfig(projectId, data) {
    const isUpdated = await ConfigRepository.update({ projectId }, data);
    if (!isUpdated) {
        throw ConfigError.ConfigNotFound();
    }

    return;
  }

  static async updateConfigById(configId, data) {
    const isUpdated = await ConfigRepository.updateById(configId, data);
    if (!isUpdated) {
        throw ConfigError.ConfigNotFound();
    }
  }

  static async publishConfig(projectId) {
    const config = await ConfigService.getConfig(projectId);
    await CoreService.publishConfig(projectId, config)
  }

  static async publishConfigById(configId) {
    const config = await ConfigService.getConfigById(configId);
    await CoreService.publishConfig(config.projectId, config)
  }
}
