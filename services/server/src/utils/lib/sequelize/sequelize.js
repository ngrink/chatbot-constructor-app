import Sequelize from "sequelize";


export const sequelize = new Sequelize(process.env.POSTGRES_ACCESS, {
  logging: process.env.NODE_ENV == "development" ? console.log : false
})
