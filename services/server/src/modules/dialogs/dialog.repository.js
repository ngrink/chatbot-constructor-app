import { UserModel } from "#users"
import { DialogModel } from "./dialog.model"


export class DialogRepository {
  static async create({ projectId, userId, channelType, channelUserId, message, answer, createdAt }) {
    const data = await DialogModel.create({
      projectId,
      userId,
      channelType,
      channelUserId,
      message,
      answer,
      createdAt
    })

    return data
  }

  static async getAll(filter) {
    const dialogs = await DialogModel.findAll({
      where: filter,
      order: [['createdAt', 'DESC']],
      include: [{
        model: UserModel,
        required: true
       }]
    })

    return dialogs
  }

  static async getOne(filter) {
    const dialog = await DialogModel.findOne({
      where: filter
    })

    return dialog
  }

  static async getById(id) {
    const dialog = await DialogModel.findByPk(id)

    return dialog
  }

  static async getByChannelDialogId(channelDialogId) {
    const dialog = await DialogModel.findOne({
      where: {channelDialogId}
    })

    return dialog
  }

  static async countMessages() {
    const data = await DialogModel.count({
      col: 'id',
      group: ['projectId']
    })

    const counts = Object.fromEntries(data.map(x => [x.projectId, x.count]))

    return counts
  }

  static async update(filter, data) {
    const [isUpdated] = await DialogModel.update(data, {
      where: filter
    });

    return isUpdated
  }

  static async updateById(id, data) {
    const [isUpdated] = await DialogModel.update(data, {
      where: { id }
    });

    return isUpdated
  }

  static async delete(filter) {
    const isDeleted = await DialogModel.destroy({
      where: filter
    });

    return isDeleted
  }

  static async deleteById(id) {
    const isDeleted = await DialogModel.destroy({
      where: { id }
    });

    return isDeleted
  }
}
