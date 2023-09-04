import { UserService } from "#users";
import { DialogService } from '#dialogs';
import { CoreAPI } from './core.api';


export class CoreService {
  static async publishConfig(projectId, config) {
    await CoreAPI.publishConfig(projectId, config);
  }

  static async connectChannel(channelId, channel) {
    await CoreAPI.connectChannel(channelId, channel);
  }

  static async disconnectChannel(channelId) {
    await CoreAPI.disconnectChannel(channelId);
  }

  static async handleNewMessage({
      projectId,
      channelId,
      channelType,
      channelUserId,
      message,
      answer,
      createdAt
  }) {

    const user = await UserService.createUser(projectId, {channelType, channelUserId, createdAt});
    DialogService.addInteraction(projectId, user.id, channelType, channelUserId, message, answer, createdAt);
  }
}
