import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '#utils/lib/sequelize';


export const UserModel = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'projects',
      key: 'id'
    }
  },
  channelType: {
    type: DataTypes.ENUM,
    values: ['vk', 'telegram'],
    allowNull: false,
  },
  channelUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo: {
    type: DataTypes.STRING,
    defaultValue: process.env.NODE_ENV == "development"
      ? "http://localhost:3000/assets/img/user-avatar.png"
      : "https://gigabot.app/assets/img/user-avatar.png"
  },
  lastMessageAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: new Date()
  }
}, {
  tableName: "users",
  timestamps: true
});
