import { DataTypes } from 'sequelize';
import { sequelize } from '#utils/lib/sequelize';


export const ConfigModel = sequelize.define("config", {
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
    },
  },
  accountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'accounts',
      key: 'id'
    },
  },
  flows: {
      type: DataTypes.JSONB,
      defaultValue: {}
  },
  nlu: {
      type: DataTypes.JSONB,
      defaultValue: {}
  },
  database_faq: {
      type: DataTypes.JSONB,
      defaultValue: {}
  },
  // database_variables: {
  //   type: DataTypes.JSONB,
  //   defaultValue: {}
  // },
  // database_tags: {
  //   type: DataTypes.JSONB,
  //   defaultValue: {}
  // },
  // database_segments: {
  //   type: DataTypes.JSONB,
  //   defaultValue: {}
  // },
  // database_storage: {
  //   type: DataTypes.JSONB,
  //   defaultValue: {}
  // },
  newsletters: {
      type: DataTypes.JSONB,
      defaultValue: {}
  },
}, {
  tableName: "configs",
  timestamps: true,
  indexes: [
    { unique: true, fields: ["projectId"] }
  ]
});
