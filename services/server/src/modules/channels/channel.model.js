import { DataTypes } from 'sequelize';
import { sequelize } from '#utils/lib/sequelize';


export const ChannelModel = sequelize.define("channel", {
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
  type: {
    type: DataTypes.ENUM,
    values: ['vk', 'telegram', 'whatsapp', 'viber'],
    allowNull: false
  },
  auth: {
    type: DataTypes.JSON,
    allowNull: false
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  error: {
    type: DataTypes.JSON
  },
}, {
  tableName: "channels",
  timestamps: true
});
