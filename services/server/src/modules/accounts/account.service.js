import Joi from 'joi';
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';

import { MailService } from '#utils/modules/mail';
import { AccountRepository } from './account.repository';
import { AccountError } from './account.exceptions';


export class AccountService {
  static async createAccount(name, surname, email, password, confirmPassword) {
    // Validate fields
    const schema = Joi.object({
      name: Joi.string()
        .required(),
      surname: Joi.string()
        .required(),
      email: Joi.string()
        .required(),
      password: Joi.string()
        .required()
        .pattern(new RegExp('^.{8,}$')),
      confirmPassword: Joi.string()
        .required()
        .pattern(new RegExp('^.{8,}$')),
    })

    const { error } = schema.validate({ name, surname, email, password, confirmPassword });
    if (error) {
      throw AccountError.ValidationError(error)
    }

    // Check if user not exists
    const userDB = await AccountRepository.getOne({ email });
    if (userDB) {
        throw AccountError.UserAlreadyExists();
    }

    // Check if the passwords match
    if (password !== confirmPassword) {
        throw AccountError.ConfirmPasswordDoNotMatch();
    }

    // Hash password and save new user to database
    const hashPassword = await bcrypt.hash(password, 10);
    const account = await AccountRepository.create({
        name, surname, email, password: hashPassword
    });

    // Send activation link and save it
    const token = uuid.v4();
    const link = `${process.env.SERVICE_API_URL}/accounts/activate/${token}` ;
    AccountRepository.createActivation(account.id, token);
    if (process.env.NODE_ENV == "production") {
      await MailService.sendActivationMail(email, link);
    }
  }

  static async getAccount(accountId) {
    const account = await AccountRepository.getById(accountId);
    return account
  }

  static async getAccountByLogin(login) {
    const account = await AccountRepository.getByLogin(login);
    return account
  }

  // static async updateAccount(accountId, data) {

  // }

  // static async deleteAccount(accountId) {

  // }

  static async activateAccount(token) {
    const data = await AccountRepository.getActivation(token);
    if (!data) {
      throw AccountError.BadRequest('Activation token is not valid');
    }

    AccountRepository.update(
      { id: data.accountId },
      { isActivated: true }
    );
    AccountRepository.deleteActivation(token)
  }

  static async passwordResetRequest(email) {
    const account = await AccountRepository.getOne({ email });
    if (!account) {
        return
    }

    const token = uuid.v4();
    const link = `${process.env.SERVICE_API_URL}/resetpass/${token}`;

    await AccountRepository.deletePasswordResetByAccountId(account.id)
    await AccountRepository.createPasswordReset(account.id, token)
    if (process.env.NODE_ENV == "production") {
      await MailService.sendResetPasswordMail(account.email, link);
    }
  }

  static async passwordReset(token, newPassword, confirmPassword) {
    if (newPassword != confirmPassword) {
        throw AccountError.ConfirmPasswordDoNotMatch();
    }

    const reset = await AccountRepository.getPasswordReset(token);
    if (!reset) {
        throw AccountError.PasswordResetTokenNotValid();
    }

    const account = await AccountRepository.getById(reset.accountId);
    const hashPassword = await bcrypt.hash(newPassword, 10);

    await AccountRepository.update(
      { id: account.id },
      { password: hashPassword }
    )
    await AccountRepository.deletePasswordResetByToken(token);
  }

  static async passwordChange(accountId, currentPassword, newPassword, confirmPassword) {
    if (newPassword !== confirmPassword) {
      throw AccountError.ConfirmPasswordDoNotMatch();
    }

    const account = await AccountRepository.getById(accountId);
    const match = await bcrypt.compare(currentPassword, account.password);
    if (!match) {
      throw AccountError.CurrentPasswordIsIncorrect();
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    await AccountRepository.update(
      { id: account.id },
      { password: hashPassword }
    )
  }
}
