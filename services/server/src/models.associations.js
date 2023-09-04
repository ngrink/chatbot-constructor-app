import {
  AccountModel,
  ActivationModel,
  PasswordResetModel } from '#accounts';
import { SessionModel } from '#auth';
import { ProjectModel } from '#projects';
import { ConfigModel } from '#configs';
import { ChannelModel } from '#channels';
import { UserModel } from '#users';
import { DialogModel } from '#dialogs';


AccountModel.hasOne(ActivationModel, {onDelete: "CASCADE"});
ActivationModel.belongsTo(AccountModel);

AccountModel.hasOne(PasswordResetModel, {onDelete: "CASCADE"});
PasswordResetModel.belongsTo(AccountModel);

AccountModel.hasOne(SessionModel, {onDelete: "CASCADE"});
SessionModel.belongsTo(AccountModel);

AccountModel.hasMany(ProjectModel, {onDelete: "CASCADE"});
ProjectModel.belongsTo(AccountModel);


ProjectModel.hasOne(ConfigModel, {onDelete: "CASCADE"});
ConfigModel.belongsTo(ProjectModel);

ProjectModel.hasMany(ChannelModel, {onDelete: "CASCADE"});
ChannelModel.belongsTo(ProjectModel);

UserModel.hasMany(DialogModel, {onDelete: "CASCADE"});
DialogModel.belongsTo(UserModel);
