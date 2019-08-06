const Sequelize = require('sequelize')
const coachmodel = require('./coaches')

// const dbconnection = ('../util/database')
const sequelize = new Sequelize({
    database: 'OhMyTennis',
    username: 'root',
   // password: 'p@ssw0rd',
    dialect: 'mysql',
    host :'172.107.175.10',
    password: '$8m9bB~4Q'
  });


const Course = sequelize.define("singlecourse_db", {
  Course_ID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Coach_ID:{
    type: Sequelize.INTEGER,
  //  references: 'coaches_db', 
   // referencesKey: 'Coach_ID'
  },
  Course_Type: {
    type: Sequelize.STRING,
  },
  Course_StartDate: {
    type: Sequelize.DATE,
  },
  Course_EndDate: {
    type: Sequelize.DATE,
  },
  Course_Place: {
    type: Sequelize.STRING,
  },
  Course_STime: {
    type: Sequelize.STRING,
  },
  Course_ETime: {
    type: Sequelize.STRING,
  },
  Course_Description: {
    type: Sequelize.STRING,
  },
  Course_Video: {
    type: Sequelize.STRING,
  },
  Course_Name: {
    type: Sequelize.STRING,
  },
  Course_Price: {
    type: Sequelize.INTEGER,
  },
  Course_Transport: {
    type: Sequelize.STRING,
  },
  Course_Provided: {
    type: Sequelize.STRING,
  },
  Course_Image: {
    type: Sequelize.STRING,
  }
})

//coachmodel.hasMany(Course)

Course.sync()
    .then(() => console.log("Course table created successfully"))
    .catch(err => console.log("BTW, did you enter wrong database 1credentials?"))
    
    module.exports = Course;