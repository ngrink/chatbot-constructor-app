import { ConfigModel } from "./config.model";


export class ConfigRepository {
  static async create({ accountId, projectId }) {
    const config = await ConfigModel.create({
      accountId,
      projectId
    })

    return config
  }

  static async getAll(filter) {
    const configs = await ConfigModel.findAll({
      where: filter
    })

    return configs
  }

  static async getOne(filter) {
    const config = await ConfigModel.findOne({
      where: filter
    })

    return config
  }

  static async getById(id) {
    const config = await ConfigModel.findByPk(id)

    return config
  }

  static async update(filter, data) {
    const [count] = await ConfigModel.update(data, {
      where: filter
    });

    return count
  }

  static async updateById(id, data) {
    const [count] = await ConfigModel.update(data, {
      where: { id }
    });

    return count
  }

  static async delete(filter) {
    const count = await ConfigModel.destroy({
      where: filter
    });

    return count
  }

  static async deleteById(id) {
    const count = await ConfigModel.destroy({
      where: { id }
    });

    return count
  }
}
