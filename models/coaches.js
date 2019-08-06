const Sequelize = require('sequelize')
const moment = require('moment');
//const dbconnection = ('../util/database')
const sequelize = new Sequelize({
  host :'172.107.175.10',
    database: 'OhMyTennis',
    username: 'root',
    // password: 'p@ssw0rd',
    password: '$8m9bB~4Q',
    dialect: 'mysql',
  });

  const Coaches = sequelize.define("coaches_db", {
    Coach_ID: {
      type: Sequelize.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    Coach_Fname: {
      type: Sequelize.STRING,
    },
    Coach_Lname: {
        type: Sequelize.STRING,
      },
  
    Coach_Email: {
    type: Sequelize.STRING,
    },
  
    Coach_Phone: {
    type: Sequelize.STRING,
    },
  
    Coach_Password: {
    type: Sequelize.STRING,
    },

    Coach_Bank_Name: {
    type: Sequelize.STRING,
    },
  
    Branch_Code: {
    type: Sequelize.STRING,
    },
  
    Coach_Bank_ACCNum: {
    type: Sequelize.STRING,
    },
  
    Coach_Price: {
      type: Sequelize.INTEGER,
      },
    Coach_PriceX10: {
      type: Sequelize.INTEGER,
    },


    Coach_Aviailability: {
      type: Sequelize.DATE,
      get: function () {
        return moment.utc(this.getDataValue('Coach_Aviailability')).format('YYYY-MM-DD')
      }
    },

    Coach_Services: {   Coach_PriceX10: {
      type: Sequelize.INTEGER,
      },

      type: Sequelize.STRING,
    },
  
    Active_City: {
      type: Sequelize.STRING,
    },

    Coach_transport: {
      type: Sequelize.STRING,
    },

    Coach_payment_type: {
      type: Sequelize.STRING,
    },
  
    Coach_City: {
    type: Sequelize.STRING,
    },
  
    Coach_Image: {
    type: Sequelize.STRING,
    },

    Coach_Resume: {
      type: Sequelize.STRING,
      },
  
    Coach_Status: {
      type: Sequelize.STRING
    },
    Coach_Description: {
      type: Sequelize.STRING
    },

    Active_Status: {
      type: Sequelize.STRING,
      defaultValue: 'Yes'
    },
    Availability_StartDate: {
      type: Sequelize.STRING,
    },
    Availability_EndDate: {
      type: Sequelize.STRING,
    },

  
  });
  Coaches.sync()
    .then(() => console.log("coach table created successfully"))
    .catch(err => console.log("BTW, did you enter wrong database credentials?"))
    
    module.exports = Coaches;
