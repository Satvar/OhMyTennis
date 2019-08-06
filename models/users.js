const Sequelize = require('sequelize')
const moment = require('moment');
//const dbconnection = ('../util/database')
const sequelize = new Sequelize({
    database: 'OhMyTennis',
    username: 'root',
    password: 'p@ssw0rd',
    dialect: 'mysql',
  });



  const User = sequelize.define("Users_db", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
 
      User_Email: {
       type: Sequelize.STRING,
     },
     
      User_FirstName: {
        type: Sequelize.STRING,
      },
      User_Name: {
          type: Sequelize.STRING,
        },
 
       User_Phone: {
         type: Sequelize.STRING,
       },
 
        User_Password: {
         type: Sequelize.STRING,
       },
 
       User_City: {
          type: Sequelize.STRING,
        },
        User_profileimage :{
          type: Sequelize.STRING,
        },
 
       User_level :{
         type: Sequelize.INTEGER,
       },
 
       User_Bank_Name: {
       type: Sequelize.STRING,
       },
     
       Branch_Code: {
       type: Sequelize.STRING,
       },
     
       User_Bank_ACCNum: {
       type: Sequelize.STRING,
       },
 
       User_Status: {
         type: Sequelize.STRING,
         defaultValue: 'Yes'
         },
 
    });
    // create user table  
      User.sync()
      .then(() => console.log("Oh yeah! User table created successfully"))
      .catch(err => console.log("BTW, did you enter wrong database credentials?"))
   
     

 module.exports = User;
 
