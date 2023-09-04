import { DataTypes } from 'sequelize';
import { sequelize } from '#utils/lib/sequelize';


export const PasswordResetModel = sequelize.define("passwordReset", {
  token: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  accountId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'accounts',
      key: 'id'
    }
  }
}, {
  tableName: "password_resets",
  updatedAt: false,
  indexes: [
    { unique: true, fields: ["accountId"] },
  ]
});
