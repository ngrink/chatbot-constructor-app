import { DataTypes } from 'sequelize';
import { sequelize } from '#utils/lib/sequelize';


export const SessionModel = sequelize.define("session", {
  accountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'accounts',
      key: 'id'
    }
  },
  userIP: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  userAgent: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  refreshToken: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
}, {
  tableName: "sessions",
  timestamps: true
});
