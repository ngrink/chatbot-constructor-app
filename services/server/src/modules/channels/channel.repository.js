import { ChannelModel } from "./channel.model"


export class ChannelRepository {
  static async create({ projectId, type, auth }) {
    const channel = await ChannelModel.create({
      projectId,
      type,
      auth
    })

    return channel
  }

  static async getAll(filter) {
    const channels = await ChannelModel.findAll({
      where: filter
    })

    return channels
  }

  static async getOne(filter) {
    const channel = await ChannelModel.findOne({
      where: filter
    })

    return channel
  }

  static async getById(id) {
    const channel = await ChannelModel.findByPk(id)

    return channel
  }

  static async getConnectedChannels() {
    const query = await ChannelModel.findAll({
      attributes: ['projectId', 'type']
    })

    const channels = {};
    for (let channel of query) {
      let {projectId, type} = channel;

      if (projectId in channels) {
        channels[projectId].push(type);
      } else {
        channels[projectId] = [type];
      }
    }

    return channels
  }

  static async update(filter, data) {
    const [isUpdated] = await ChannelModel.update(data, {
      where: filter
    });

    return isUpdated
  }

  static async updateById(id, data) {
    const [isUpdated] = await ChannelModel.update(data, {
      where: { id }
    });

    return isUpdated
  }

  static async delete(filter) {
    const isDeleted = await ChannelModel.destroy({
      where: filter
    });

    return isDeleted
  }

  static async deleteById(id) {
    const isDeleted = await ChannelModel.destroy({
      where: { id }
    });

    return isDeleted
  }
}
