import { UserModel } from "./user.model"


export class UserRepository {
  static async create({ projectId, channelType, channelUserId, name, photo}) {
    const user = await UserModel.create({
      projectId,
      channelType,
      channelUserId,
      name,
      photo
    })

    return user
  }

  static async getAll(filter) {
    const users = await UserModel.findAll({
      where: filter
    })

    return users
  }

  static async getOne(filter) {
    const user = await UserModel.findOne({
      where: filter
    })

    return user
  }

  static async getById(id) {
    const user = await UserModel.findByPk(id)

    return user
  }

  static async getByChannelUserId(channelUserId) {
    const user = await UserModel.findOne({
      where: {channelUserId}
    })

    return user
  }

  static async countUsers() {
    const data = await UserModel.count({
      col: 'id',
      group: ['projectId']
    })

    const counts = Object.fromEntries(data.map(x => [x.projectId, x.count]))

    return counts
  }

  static async update(filter, data) {
    const [isUpdated] = await UserModel.update(data, {
      where: filter
    });

    return isUpdated
  }

  static async updateById(id, data) {
    const [isUpdated] = await UserModel.update(data, {
      where: { id }
    });

    return isUpdated
  }

  static async delete(filter) {
    const isDeleted = await UserModel.destroy({
      where: filter
    });

    return isDeleted
  }

  static async deleteById(id) {
    const isDeleted = await UserModel.destroy({
      where: { id }
    });

    return isDeleted
  }
}
