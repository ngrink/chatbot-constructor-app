import { DialogRepository } from './dialog.repository';


export class DialogService {
  static async getProjectDialogs(projectId) {
    return await DialogRepository.getAll({projectId});
  };

  static async addInteraction(projectId, userId, channelType, channelUserId, message, answer, createdAt) {
    return await DialogRepository.create({projectId, userId, channelType, channelUserId, message, answer, createdAt});
  };
}
