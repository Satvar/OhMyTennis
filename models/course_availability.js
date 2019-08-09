const Sequelize = require('sequelize')
const moment = require('moment');
//const dbconnection = ('../util/database')
const sequelize = new Sequelize({
    database: 'OhMyTennis',
    username: 'root',
    password: 'p@ssw0rd',
    dialect: 'mysql',
  });

  const availability = sequelize.define("availability_db", {
    Availability_id: {
      type: Sequelize.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    Coach_id: {
        type: Sequelize.STRING,
      },
  
    Mon_mor: {
    type: Sequelize.STRING,
    },
  
    Mon_af: {
    type: Sequelize.STRING,
    },
  
    Mon_eve: {
    type: Sequelize.STRING,
    },

    Tue_mor: {
    type: Sequelize.STRING,
    },
    
    Tue_af: {
    type: Sequelize.STRING,
    },
    
    Tue_eve: {
    type: Sequelize.STRING,
    },

    Wed_mor: {
    type: Sequelize.STRING,
    },
    
    Wed_af: {
    type: Sequelize.STRING,
    },
    
    Wed_eve: {
    type: Sequelize.STRING,
    },

    Thu_mor: {
    type: Sequelize.STRING,
    },
    
    Thu_af: {
    type: Sequelize.STRING,
    },
    
    Thu_eve: {
    type: Sequelize.STRING,
    },

    Fri_mor: {
    type: Sequelize.STRING,
    },
    
    Fri_af: {
    type: Sequelize.STRING,
    },
    
    Fri_eve: {
    type: Sequelize.STRING,
    },

    Sat_mor: {
    type: Sequelize.STRING,
    },
    
    Sat_af: {
    type: Sequelize.STRING,
    },
    
    Sat_eve: {
    type: Sequelize.STRING,
    },

    Sun_mor: {
    type: Sequelize.STRING,
    },
    
    Sun_af: {
    type: Sequelize.STRING,
    },
    
    Sun_eve: {
    type: Sequelize.STRING,
    },

    Coach_Flag: {
    type: Sequelize.STRING,
    },

  
  });
  availability.sync()
    .then(() => console.log("availability table created successfully"))
    .catch(err => console.log("BTW, did you enter wrong database credentials?"))
    
    module.exports = availability;