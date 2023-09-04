import { DataTypes } from 'sequelize';
import { sequelize } from '#utils/lib/sequelize';

import { AccountModel } from '../account.model';


export const ActivationModel = sequelize.define("activation", {
  token: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  accountId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'accounts',
      key: 'id',
    }
  }
}, {
  tableName: "activations",
  updatedAt: false,
  indexes: [
    { unique: true, fields: ["accountId"] },
  ]
});

sequelize.ActivationModel = ActivationModel;

ActivationModel.belongsTo(AccountModel);
