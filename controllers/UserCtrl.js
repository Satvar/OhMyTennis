const userModel  = require('../models/users')
const CoachModel  = require('../models/coaches')
const CourseModel = require('../models/individualcourse')
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const fs  = require('fs')
const path = require('path')
const handlebars = require('handlebars');

const readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};


exports.quickInsertCoach = (req,res,next) => {
    console.log("nisha",req.query);
    const Coach_Email = req.body.Coach_Email;
    const Coach_Fname = req.body.Coach_Fname;
    const Coach_Lname = req.body.Coach_Lname;
    const Coach_Phone = req.body.Coach_Phone;
    const Coach_Password = req.body.Coach_Password;
    const Coach_City = req.body.Coach_City;

    CoachModel.findAll({
        where: {
            Coach_Email: Coach_Email
        }
    })
        .then(function (result) {
            console.log(result);
            if (result.length > 0) {
                res.status(200).json({
                    errCode:'505',
                    message: "Email id already exits",
                   
                })
            }
            else {
                CoachModel.create({
                    Coach_Email:Coach_Email,
                    Coach_Fname:Coach_Fname,
                    Coach_Lname:Coach_Lname,
                    Coach_Phone:Coach_Phone,
                    Coach_Password:Coach_Password,
                    Coach_City:Coach_City,
                }) .then(result =>{
            
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: 'vinothh334@gmail.com',
                          pass: 'vinothsange3'
                        }
                      });
            
                      readHTMLFile(__dirname + '/emailtemplate.html', function(err, html) {
                        var template = handlebars.compile(html);
                        var replacements = {
                             username: Coach_Fname,
                             link:'http://localhost:3000/OhMyTennis/coachVerification/?Coach_Email='+ Coach_Email
                        };
                        var htmlToSend = template(replacements);
                    var mailOptions = {
                        from: 'vinothh334@gmail.com',
                        to: Coach_Email,
                        subject: 'OhMyTennis - Vérifiez votre EA-mail',
                        html:htmlToSend
                        //text:'Click here to verify coach ' + 'http://localhost:3000/OhMyTennis/coachVerification/?Coach_Email='+ Coach_Email
                      };
            
                      
                      
                    transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                    });
                })
                      
            
                    res.status(201).json({
                        message : "Registration successfull",
                        user:result
                    })
                })

                
            }

        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });    
}
exports.detailedInsertCoach = (req, res, next) => {

    // console.log(req.file.path)
    const Coach_Bank_ACCNum = req.body.Coach_Bank_ACCNum;
    const Coach_Bank_Name = req.body.Coach_Bank_Name;
    const Branch_Code = req.body.Branch_Code;
    const Coach_Services = req.body.Coach_Services;
    const Active_City = req.body.Active_City;
    const Coach_Price = req.body.Coach_Price;
    const Coach_transport = req.body.Coach_transport;
    const Coach_payment_type = req.body.Coach_payment_type;
    const Coach_Image = req.files.Coach_Image[0].filename
    const Coach_Aviailability = req.body.Coach_Aviailability;
    const Coach_Email = req.body.Coach_Email;//where
    const Coach_Resume = req.files.Coach_Resume[0].filename;
    const Coach_Description = req.body.Coach_Description;
    const Coach_PriceX10 = req.body.Coach_PriceX10;
    const Availability_StartDate = req.body.Availability_StartDate;
    const Availability_EndDate = req.body.Availability_EndDate;

    console.log(req.files.Coach_Resume[0]);


    CoachModel.update(
        {

            Coach_Price: Coach_Price,
            Coach_Bank_Name: Coach_Bank_Name,
            Branch_Code: Branch_Code,
            Coach_Bank_ACCNum: Coach_Bank_ACCNum,
            Coach_Aviailability: Coach_Aviailability,
            Coach_Services: Coach_Services,

            Active_City: Active_City,
            Coach_transport: Coach_transport,
            Coach_payment_type: Coach_payment_type,
            Coach_Image: Coach_Image,
            Coach_Resume: Coach_Resume,
            Coach_Description: Coach_Description,
            Coach_PriceX10: Coach_PriceX10,
            Availability_StartDate: Availability_StartDate,
            Availability_EndDate: Availability_EndDate
        },
        {
            where: {
                Coach_Email: Coach_Email,
                Coach_Status: 'verified'
            }
        }
    )
        .then(result =>
            CoachModel.findAll({
                where: {
                    Coach_Email: Coach_Email,
                }
            })
                .then(function (result) {
                    res.status(200).json({
                        msg: 'coach details updated successfully',
                        updateCoachList: result
                    })
                })
        )
        .error(err =>
            res.status(500).json({
                msg: 'coach details updation Failed'
            })
        )

}

// exports.detailedInsertCoach = (req,res,next) => {

//    // console.log(req.file.path)
//     const Coach_Bank_ACCNum = req.body.Coach_Bank_ACCNum;
//     const Coach_Bank_Name = req.body.Coach_Bank_Name;
//     const Branch_Code = req.body.Branch_Code;
//     const Coach_Services = req.body.Coach_Services;
//     const Active_City = req.body.Active_City;
//     const Coach_Price = req.body.Coach_Price;
//     const Coach_transport = req.body.Coach_transport;
//     const Coach_payment_type = req.body.Coach_payment_type;
//     const Coach_Image = req.files.Coach_Image[0].filename
//     const Coach_Aviailability = req.body.Coach_Aviailability;
//     const Coach_Email= req.body.Coach_Email;//where
//     const Coach_Resume  = req.files.Coach_Resume[0].filename;
//     const Coach_Description = req.body.Coach_Description;
//     const Coach_PriceX10 = req.body.Coach_PriceX10;
//     const Availability_StartDate = req.body.Availability_StartDate;
//     const Availability_EndDate = req.body.Availability_EndDate;

//     console.log(req.files.Coach_Resume[0]);


//     CoachModel.update(
//         { 

//             Coach_Price:Coach_Price,
          
//             Coach_Bank_Name:Coach_Bank_Name,
//             Branch_Code:Branch_Code,
//             Coach_Bank_ACCNum:Coach_Bank_ACCNum,
//             Coach_Aviailability:Coach_Aviailability,
//             Coach_Services:Coach_Services,

//             Active_City:Active_City,
//             Coach_transport:Coach_transport,
//             Coach_payment_type:Coach_payment_type,
//             Coach_Image:Coach_Image,
//             Coach_Resume : Coach_Resume,
//             Coach_Description:Coach_Description,
//             Coach_PriceX10:Coach_PriceX10,
//             Availability_StartDate:Availability_StartDate,
//             Availability_EndDate:Availability_EndDate
//          },
//         {
//              where: {
//             Coach_Email: Coach_Email,
//             Coach_Status: 'verified' 
//             } 
//         }
//       )
//       .then(result =>
//         res.status(200).json({
//             msg : 'coach details updated successfully'
//         })
//     )
//     .error(err =>
//         res.status(500).json({
//             msg : 'coach details updation Failed'
//         })
//     )

// }

exports.coachVerification = (req,res,next) =>{

    CoachModel.update(
        { Coach_Status: 'verified' },
        { where: {Coach_Email: req.query.Coach_Email } }
      )
      .then(result =>
        {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'vinothh334@gmail.com',
                  pass: 'vinothsange3'
                }
              });
    
    
            var mailOptions = {
                from: 'vinothh334@gmail.com',
                to: req.query.Coach_Email,
                cc:'duraimurugan@tech.cloudnausor.com',
                subject: 'OhMyTennis-coach',
                text: 'Welcome to OhMYTennis!'
              };
    
              
              
            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                // res.status(200).json({
                //     msg : 'coachVerification success'
                // })
                // console.log('Email sent: ' + info.response);
                res.redirect('http://localhost:3000/#!/OhMyTennis/CoachLogin/?emailVerificationFlag=1');
            }
            });
        }
            
        )
        .error(err =>
            res.status(500).json({
                msg : 'coachVerification Failed'
            })
        )

}
// exports.coachSignIn = (req, res, next) => {
//     console.log(req.body);
//     const Coach_Email = req.body.Coach_Email;
//     const Coach_Password = req.body.Coach_Password;
//     CoachModel.findAll({
//         where: {
//             Coach_Email: Coach_Email,
//             Coach_Password: Coach_Password,
//             Coach_Status: 'verified'
//         }
//     })
//         .then(function (result) {
//             console.log("rsult",result);
//             if (result.length > 0) {
//                 if(res)
//                 res.status(200).json({
//                     errCode:'200',
//                     msg: "Valid credentials",
//                     coachlist: result
//                 })
//             }
//             else {
//                 res.status(200).json({
//                     errCode:'500',
//                     msg: "Invalid credentials or you are not a verified by admin"
//                 })
//             }

//         }).catch(err => {
//             console.log(err)
//             res.status(500).json({
//                 error: err
//             })
//         });
// }
exports.coachSignIn = (req, res, next) => {
    console.log(req.body);
    const Coach_Email = req.body.Coach_Email;
    const Coach_Password = req.body.Coach_Password;
    CoachModel.findAll({
        where: {
            Coach_Email: Coach_Email,
          //  Coach_Password: Coach_Password,
            Coach_Status: 'verified'
        }
    })
        .then(function (result) {
            console.log("rsult",result);
            if(result.length >0){
                if(result[0].Coach_Password == Coach_Password){
                  res.send({
                    code:200,
                    success:"login sucessfull",
                    coachlist: result
                      });
                }
                else{
                  res.send({
                    code:204,
                    success:"Email and password does not match"
                      });
                }
              }
              else{
                res.send({
                  code:203,
                  success:"Email does not exits"
                    });
              }

        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
}

exports.quickInsertUser = (req, res, next) => {
    console.log("bodyy",req.body)
    const User_Email = req.body.User_Email;
    const User_FirstName = req.body.User_FirstName;
    const User_Name = req.body.User_Name;
    const User_Phone = req.body.User_Phone;
    const User_Password = req.body.User_Password;
    userModel.create({
        User_Email: User_Email,
        User_FirstName: User_FirstName,
        User_Name: User_Name,
        User_Phone: User_Phone,
        User_Password: User_Password


    }).then(result => {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'vinothh334@gmail.com',
                pass: 'vinothsange3'
            }
        });
        readHTMLFile(__dirname + '/emailtemplate.html', function(err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                 username: User_Name,
                 link:'http://localhost:3000/OhMyTennis/userVerification/?User_Email=' + User_Email
            };
            var htmlToSend = template(replacements);

        var mailOptions = {
            from: 'vinothh334@gmail.com',
            to: req.body.User_Email,
            cc:'duraimurugan@tech.cloudnausor.com',
            subject: 'OhMyTennis - Vérifiez votre E-mail',
            html:htmlToSend
            //text: 'Click here to verify user ' + 'http://localhost:3000/OhMyTennis/userVerification/?User_Email=' + User_Email
        };



        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });


        res.status(201).json({
            message: "Registration successfull",
            user: result
        })
    })


        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });

}

exports.detailedInsertUser = (req,res,next) =>{
console.log("req",req.body)
console.log("req",req.file)
    const User_City = req.body.User_City;
    const User_profileimage = req.file.path;
    const User_level = req.body.User_level;

    const User_Bank_Name = req.body.User_Bank_Name;
    const Branch_Code = req.body.Branch_Code;
    const User_Bank_ACCNum = req.body.User_Bank_ACCNum;
    const User_Status = req.body.User_Status;
    const User_Email= req.body.User_Email;//where
    
    userModel.update(
        { 

            User_City:User_City,
            User_profileimage:User_profileimage,
            User_level:User_level,
            User_Bank_Name:User_Bank_Name,
            Branch_Code:Branch_Code,
            User_Bank_ACCNum:User_Bank_ACCNum,
            User_Status:User_Status,
         },
        {
             where: {
                User_Email: User_Email,
                User_Status: 'verified' 
            } 
        }
      )

    .then(result =>{

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'vinothh334@gmail.com',
              pass: 'vinothsange3'
            }
          });


        var mailOptions = {
            from: 'vinothh334@gmail.com',
            to: 'tprasath40@gmail.com',
            cc:'duraimurugan@tech.cloudnausor.com',
            subject: 'Sign Up',
            text: 'Click here to verify user ' + 'http://localhost:3000/OhMyTennis/userVerification/?userEmail='+ User_Email
          };

          
          
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
          

        res.status(201).json({
            message : "user row created",
            user:result
        })
    })
    .catch(err => {
       console.log(err)
       res.status(500).json({
           error : err
       })
    });

}


exports.userVerification = (req,res,next) =>{

    userModel.update(
        { User_Status: 'verified' },
        { where: {User_Email: req.query.User_Email } }
      )
      .then(result =>
        {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'vinothh334@gmail.com',
                  pass: 'vinothsange3'
                }
              });
    
    
            var mailOptions = {
                from: 'vinothh334@gmail.com',
                to: req.query.User_Email,
                subject: 'OhMyTennis-user',
                text: 'Your registration accepted!!'
              };
    
              
              
            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                // res.status(200).json({
                //     msg : 'userVerification success'
                // })

                res.redirect('http://localhost:3000/#!/OhMyTennis/UserLogin/?emailVerificationFlag=1');
                console.log('Email sent: ' + info.response);
            }
            });
        }
            
        )
        .error(err =>
            res.status(500).json({
                msg : 'userVerification Failed'
            })
        )

}

// exports.userSignIn = (req, res, next) => {
//     console.log(req.body);
//     const User_Email = req.body.User_Email;
//     const User_Password = req.body.User_Password;
//     userModel.findAll({
//         where: {
//             User_Email: User_Email,
//             User_Password: User_Password,
//             User_Status: 'verified'
//         }
//     })
//         .then(function (result) {
//             console.log(result);
//             if (result.length > 0) {
//                 res.status(200).json({
//                     errCode :'200',
//                     msg: "Valid credentials",
//                     userlist: result,
//                 })
//             }
//             else {
//                 res.status(200).json({
//                     errCode :'500',
//                     msg: "Invalid credentials or you are not verified by admin"
//                 })
//             }

//         }).catch(err => {
//             console.log(err)
//             res.status(500).json({
//                 error: err
//             })
//         });
// }
exports.userSignIn = (req, res, next) => {
    console.log(req.body);
    const User_Email = req.body.User_Email;
    const User_Password = req.body.User_Password;
    userModel.findAll({
        where: {
            User_Email: User_Email,
           // User_Password: User_Password,
            User_Status: 'verified'
        }
    })
        .then(function (result) {
            console.log(result);
            if(result.length >0){
                if(result[0].User_Password == User_Password){
                  res.send({
                    code:200,
                    success:"login sucessfull",
                    userlist: result
                      });
                }
                else{
                  res.send({
                    code:204,
                    success:"Email and password does not match"
                      });
                }
              }
              else{
                res.send({
                  code:203,
                  success:"Email does not exits"
                    });
              }

        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
}
exports.downloadresume = (req,res,next) =>{
   // console.log("req",req.body)
    
    const filename = req.body.Coach_Resume;
     const downloadpath = path.join('scripts','upload',filename);
    fs.readFile(downloadpath,(err,data) =>{
      if(err){
          return next(err)
      }
     // console.log("data",data)
      res.send(data)
    })
    // const file = '${__dirname}/scripts/upload/2019-07-24T13:47:25.494Z-Class Magnt.pdf'
    // res.download(downloadpath)

}
exports.getCoachDetails = (req, res, next) => {
    CoachModel.findAll({
       
    })
        .then(function (result) {
            console.log(result);
            if (result.length > 0) {
                res.status(200).json({
                    coachlist: result
                })
            }
            else {
                res.status(510).json({
                    msg: "error"
                })
            }

        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
}
    
    
exports.getUserDetails = (req, res, next) => {
    userModel.findAll({
        // where: {
        //     User_Status: null
        // }
    })
        .then(function (result) {
            console.log(result);
            if (result.length > 0) {
                res.status(200).json({
                    userlist: result
                })
            }
            else {
                res.status(510).json({
                    msg: "error"
                })
            }

        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
}

exports.blockCoach = (req, res, next) => {
    CoachModel.update(
        { Active_Status: 'No' },
        { where: { Coach_ID: req.body.Coach_ID } }
    )
        .then(function (result) {
            console.log(result);
            res.status(200).json({
                msg: 'Coach blocked'
            })

        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
}


exports.unBlockCoach = (req, res, next) => {
    CoachModel.update(
        { Active_Status: 'Yes' },
        { where: { Coach_ID: req.body.Coach_ID } }
    )
        .then(function (result) {
            console.log(result);
            res.status(200).json({
                msg: 'Coach Unblocked'
            })

        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
}


exports.deleteCoach = (req, res, next) => {
    console.log('----------------------------------------------------------');
    console.log('gt', req.body);
    CoachModel.destroy({
        where: {
            Coach_ID: req.body.Coach_ID
        }
    })
        .then(function (result) {
            console.log(result);
            res.status(200).json({
                msg: 'Coach deleted '
            })

        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
}

exports.insertIndividualCourse = (req,res,next) =>{
console.log("req",req.body)
    const coachid = req.body.Coach_ID;
    const coursetype = req.body.Course_Type;
    const startdate = req.body.Course_StartDate;
    const enddate = req.body.Course_EndDate;
    const place = req.body.Course_Place;
    const coursestarttime = req.body.Course_STime;
    const courseendtime = req.body.Course_ETime;
    const description = req.body.Course_Description;
    const video = req.body.Course_Video;
    const name =req.body.Course_Name;
    const price = req.body.Course_Price;
    const transport = req.body.Course_Transport;
    const provided = req.body.Course_Provided;
    const courseimage  = req.file.path
    CourseModel.create({
        Coach_ID:coachid,
        Course_Type:coursetype,
        Course_StartDate:startdate,
        Course_EndDate:enddate,
        Course_Place:place,
        Course_STime:coursestarttime,
        Course_ETime:courseendtime,
        Course_Description:description,
        Course_Video:video,
        Course_Name:name,
        Course_Price:price,
        Course_Transport:transport,
        Course_Provided:provided,
        Course_Image:courseimage


    }).then(result =>{
        res.status(200).json({
            message: "individual course added successfully",
            list: result
        })

    }).catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })


}

exports.forgotpassword = (req, res, next) => {
    console.log("reqbody", req.body);
    const Coach_Email = req.body.Coach_Email;
    CoachModel.findAll({
        where: {
            Coach_Email: Coach_Email,
            Coach_Status: 'verified'
        }
    })
        .then(function (result) {
            console.log("rsult", result);
            if (result.length == 1) {

                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'vinothh334@gmail.com',
                            pass: 'vinothsange3'
                        }
                    });

                    readHTMLFile(__dirname + '/fgtPassword.html', function (err, html) {
                        var template = handlebars.compile(html);
                        var replacements = {
                            username: result[0].Coach_Fname,
                            link: 'http://localhost:3000/OhMyTennis/Password/?Coach_Email=' +Coach_Email
                        };
                        var htmlToSend = template(replacements);
                        var mailOptions = {
                            from: 'vinothh334@gmail.com',
                            to: Coach_Email,
                            subject: 'OhMyTennis - Password Reset',
                            html: htmlToSend
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                    })

                    res.status(201).json({
                        message: "Reset Password successfull",
                        user: result
                    })
               // })
            }
            else {
                res.send({
                    code: 203,
                    success: "Email does not exits"
                });
            }

        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
}

exports.resetpassword = (req,res,next) =>{
    res.redirect('http://localhost:3000/#!/OhMyTennis/PasswordReset/?Coach_Email='+req.query.Coach_Email);
}

exports.setNewPassword = (req, res, next) => {
    console.log("req", req.body)
    const Coach_Email = req.body.Coach_Email;
    const Coach_Password = req.body.Coach_Password;//where
    CoachModel.update(
        {
            Coach_Password: Coach_Password,
        },
        {
            where: {
                Coach_Email: Coach_Email
            }
        }
    )

        .then(result => {
            res.status(201).json({
                message: "password successfully updated",
                data: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
}

exports.blockUser = (req, res, next) => {

    console.log('--------------------------------------------------------------------------------------------------------------------')
    console.log(req.body);
    var id = req.body.id
    console.log('id', id);
    userModel.update(
        { User_Status: 'No' },
        { where: { id: req.body.id } }
    )
        .then(function (result) {
            console.log(result);
            res.status(200).json({
                msg: 'User blocked'
            })

        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
}
    
    
    
    
    
exports.unBlockUser = (req, res, next) => {
    userModel.update(
        { User_Status: 'Yes' },
        { where: { id: req.body.id } }
    )
        .then(function (result) {
            console.log(result);
            res.status(200).json({
                msg: 'User Unblocked'
            })

        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
}
    
    
exports.deleteUser = (req, res, next) => {
    console.log('----------------------------------------------------------');
    console.log('gt', req.body);
    userModel.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(function (result) {
            console.log(result);
            res.status(200).json({
                msg: 'User deleted '
            })

        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
}


exports.forgotpassworduser = (req, res, next) => {
    console.log("reqbody", req.body);
    const User_Email = req.body.User_Email;
    userModel.findAll({
        where: {
            User_Email: User_Email,
            User_Status: 'verified'
        }
    })
        .then(function (result) {
            console.log("rsult", result);
            if (result.length == 1) {

                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'vinothh334@gmail.com',
                            pass: 'vinothsange3'
                        }
                    });

                    readHTMLFile(__dirname + '/fgtPassword.html', function (err, html) {
                        var template = handlebars.compile(html);
                        var replacements = {
                            username: result[0].User_FirstName,
                            link: 'http://localhost:3000/OhMyTennis/UserPassword/?User_Email=' +User_Email
                        };
                        var htmlToSend = template(replacements);
                        var mailOptions = {
                            from: 'vinothh334@gmail.com',
                            to: User_Email,
                            subject: 'OhMyTennis - Password Reset',
                            html: htmlToSend
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                    })

                    res.status(201).json({
                        message: "Reset Password successfull",
                        user: result
                    })
               // })
            }
            else {
                res.send({
                    code: 203,
                    success: "Email does not exits "
                });
            }

        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
}

exports.userResetpassword = (req,res,next) =>{
    res.redirect('http://localhost:3000/#!/OhMyTennis/UserPasswordReset/?User_Email='+req.query.User_Email);
}


exports.setNewPasswordUser = (req, res, next) => {
    console.log("req", req.body)
    console.log("redsdq", req.body)

    console.log("redsdsdsq", req.body)
    const User_Email = req.body.User_Email;
    const User_Password = req.body.User_Password;//where
    userModel.update(
        {
            User_Password: User_Password,
        },
        {
            where: {
                User_Email: User_Email
            }
        }
    )

        .then(result => {
            res.status(201).json({
                message: "password successfully updated",
                data: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
}


// dfakjdflajdfajsd