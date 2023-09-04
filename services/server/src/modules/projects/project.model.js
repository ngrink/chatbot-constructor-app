import { DataTypes } from 'sequelize';
import { sequelize } from '../../utils/lib/sequelize/sequelize';


export const ProjectModel = sequelize.define("project", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  accountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'accounts',
      key: 'id'
    }
  },
  configId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'configs',
        key: 'id'
      }
  },
  name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('name', value.trim());
      },
  },
  tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
  },
}, {
  tableName: "projects",
  timestamps: true
});
