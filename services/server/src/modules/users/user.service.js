import { VK } from "vk-io";

import { CoreService } from '#core';
import { UserRepository } from './user.repository';
import { UserError } from './user.exceptions';


export class UserService {
  static vk = new VK({
    token: process.env.VK_ACCESS
  });

  static async getProjectUsers(projectId) {
    return await UserRepository.getAll({projectId});
  };

  static async createUser(projectId, {channelType, channelUserId, createdAt}) {
    const userDB = await UserRepository.getByChannelUserId(channelUserId)
    if (userDB) {
      userDB.lastMessageAt = new Date(createdAt);
      userDB.save();
      return userDB
    }

    let name = `USER${channelUserId}`;
    let photo;

    try {
      switch (channelType) {
        case 'vk':
          const users = await UserService.vk.api.users.get({
            user_ids: channelUserId,
            fields: `photo_50`
          })

          const { first_name, last_name, photo_50 } = users[0];
          photo = photo_50
          name = `${first_name} ${last_name}`;
          break;
        case 'telegram':
          break
        default:
          break;
      }
    } catch (e) {
      console.log(e)
    }

    const user = await UserRepository.create({
      projectId,
      channelType,
      channelUserId,
      name,
      photo,
      lastMessageAt: createdAt
    });
    return user
  };
}
