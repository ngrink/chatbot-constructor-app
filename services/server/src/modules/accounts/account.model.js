import { DataTypes } from 'sequelize';
import { sequelize } from '#utils/lib/sequelize';


export const AccountModel = sequelize.define("account", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('name', value.trim());
    },
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('surname', value.trim());
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    },
    set(value) {
      this.setDataValue('email', value.trim().toLowerCase());
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActivated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  roles: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: ["user"]
  },
  username: {
    type: DataTypes.STRING,
    set(value) {
      this.setDataValue('username', value.trim().toLowerCase());
    }
  },
}, {
  tableName: "accounts",
  timestamps: true,
  indexes: [
    { unique: true, fields: ["email"] },
    { unique: true, fields: ["username"] },
  ]
});
