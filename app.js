const express = require('express')
const bodyParser  = require('body-parser')
const userRoutes = require('./routes/admin')
const MainRoutes = require('./routes/homepage')
const sequelize  = require('./util/database')
const coachmodel = require('./models/coaches')
const coursemodel = require('./models/individualcourse')

//const userModel = require('./models/users')
var passport = require('passport');
var session = require('express-session');
const app = express();
app.use(session({
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})
coursemodel.belongsTo(coachmodel,{foreignKey : 'Coach_ID'})
coachmodel.hasMany(coursemodel,{foreignKey:'Coach_ID'})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/scripts'))
// app.get('/OhMyTennis/CoachLogin/PasswordReset',(req,res,next) =>{
//   console.log("ffd")
//   res.redirect('http://localhost:8000/OhMyTennis/CoachLogin/PasswordReset/?Coach_Email=' + req.query.Coach_Email)
// })
app.get('/admin', (req, res, next) => {
  console.log('admin');
  res.redirect('http://localhost:3000/#!/OhMyTennis/AdminPanel/');
})
app.use("/OhMyTennis" , userRoutes)
app.use("/OhMyTennis" , MainRoutes)



sequelize
  .authenticate()
  .then(() => {
    app.listen(3000)  
    console.log("Connection has been established successfully.")
  })
  .catch(err => console.error("Unable to connect to the database:", err));

     


