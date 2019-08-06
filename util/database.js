const Sequelize = require('sequelize')
const sequelize = new Sequelize({
    database: 'OhMyTennis',
    username: 'root',
    password: 'p@ssw0rd',
    dialect: 'mysql',
  });



  module.exports = sequelize;