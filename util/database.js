const Sequelize = require('sequelize')
const sequelize = new Sequelize({
    database: 'OhMyTennis',
    username: 'root',
   // password: 'p@ssw0rd',
    dialect: 'mysql',
    host :'172.107.175.10',
    password: '$8m9bB~4Q',
  });



  module.exports = sequelize;