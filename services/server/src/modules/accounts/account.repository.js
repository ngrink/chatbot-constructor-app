import { Op } from "sequelize";

import { AccountModel } from "./account.model";
import { ActivationModel } from "./submodels/activation.model";
import { PasswordResetModel } from "./submodels/passwordreset.model"


export class AccountRepository {
  static async create({name, surname, email, password}) {
    const account = await AccountModel.create({
      name,
      surname,
      email,
      password
    })

    return account
  }

  static async getAll(filter) {
    const accounts = await AccountModel.findAll({
      where: filter
    })

    return accounts
  }

  static async getOne(filter) {
    const account = await AccountModel.findOne({
      where: filter
    })

    return account
  }

  static async getById(id) {
    const account = await AccountModel.findByPk(id)

    return account
  }

  static async getByLogin(login) {
    const account = await AccountModel.findOne({
      where: {
        [Op.or]: [
          { email: login },
          { username: login }
        ]
      }
    })

    return account
  }

  static async update(filter, data) {
    await AccountModel.update(data, {
      where: filter
    });
  }

  static async updateById(id, data) {
    await AccountModel.update(data, {
      where: { id }
    });
  }

  static async delete(filter) {
    await AccountModel.destroy({
      where: filter
    });
  }

  static async deleteById(id) {
    await AccountModel.destroy({
      where: { id }
    });
  }

  static async createActivation(accountId, token) {
    return await ActivationModel.create({
        accountId,
        token
    });
  }

  static async getActivation(token) {
    return await ActivationModel.findByPk(token);
  }

  static async deleteActivation(token) {
    await ActivationModel.destroy({
      where: { token }
    });
  }

  static async createPasswordReset(accountId, token) {
    return await PasswordResetModel.create({
        accountId,
        token
    });
  }

  static async getPasswordReset(token) {
    return await PasswordResetModel.findByPk(token);
  }

  static async deletePasswordResetByAccountId(accountId) {
    await PasswordResetModel.destroy({
      where: { accountId }
    });
  }

  static async deletePasswordResetByToken(token) {
    await PasswordResetModel.destroy({
      where: { token }
    });
  }
}
