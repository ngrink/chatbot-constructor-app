import { DataTypes } from 'sequelize';
import { sequelize } from '#utils/lib/sequelize';


export const DialogModel = sequelize.define("dialog", {
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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
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
  message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "dialogs",
  timestamps: false
});
