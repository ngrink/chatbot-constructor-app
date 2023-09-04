import { CoreService } from '#core';
import { ChannelRepository } from './channel.repository';
import { ChannelError } from './channel.exceptions';


export class ChannelService {
  static async getAllChannels() {
    return await ChannelRepository.getAll();
  };

  static async getChannels(filter) {
    return await ChannelRepository.getAll(filter);
  };

  static async getChannel(channelId) {
    return await ChannelRepository.getById(channelId);
  };

  static async addChannel(projectId, type, auth) {
    const channel = await ChannelRepository.create({ projectId, type, auth });
    await CoreService.connectChannel(channel.id, channel);

    return channel
  };

  // static async updateChannel(channelId, auth) {
  //   const channel = await ChannelRepository.updateById(channelId, { auth });

  //   await CoreService.disconnectChannel(channelId);
  //   await CoreService.connectChannel(channel);
  // };

  static async removeChannel(channelId) {
    const isDeleted = await ChannelRepository.deleteById(channelId);
    if (!isDeleted) {
      throw ChannelError.ChannelNotFound();
    }
    await CoreService.disconnectChannel(channelId);
  };

  static async enableChannel(channelId) {
    const isUpdated = await ChannelRepository.updateById(channelId, {enabled: true});
    if (!isUpdated) {
      throw ChannelError.ChannelNotFound();
    }

    const channel = await ChannelService.getChannel(channelId);
    await CoreService.connectChannel(channel);
  };

  static async disableChannel(channelId) {
    const isUpdated = await ChannelRepository.updateById(channelId, {enabled: false});
    if (!isUpdated) {
      throw ChannelError.ChannelNotFound();
    }
    await CoreService.disconnectChannel(channelId); //     await CoreService.disconnectChannel(channelId, type);
  };
}
