const CoachModel  = require('../models/coaches')
const CourseModel  = require('../models/individualcourse')
// const bcrypt = require('bcrypt')
// const jwt  = require('jsonwebtoken')

exports.getalldata = (req,res,next) => {
    CoachModel.findAll().
    then(users =>{
        if( !users ){
               return res.status(404).json({
                   msg : "Unathourised"
               })
        }
        if(users.length == 0){
            res.status(506).json({
                msg : "no users"
            })
        }
        else{
            res.status(202).json({
                msg : "fetched",
                coaches : users
            })
        }

    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error : err
        })
     });
}

exports.search_for_coach = (req, res, next) => {
    console.log("req",req.body)
    const city = req.body.ville;
    //const date = new Date(req.body.date);
    CoachModel.findAll({
        where: {
            Coach_City: city,
          //  Coach_Aviailability: date
        }
    })
        .then(function (result) {
            console.log(result);
            if (result.length > 0) {
                res.status(200).json({
                    msg: "coachlist fetched",
                    coachlist: result
                })
            }
            else {
                res.status(200).json({
                    msg: "no coaches available",
                    coachlist: result
                })
            }

        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
}

exports.searchindetailforcoach = (req, res, next) => {
    console.log("req",req.body)
    const city = req.body.ville;
    const course = req.body.course
    const coursedate = req.body.coursedate;
    const startime = req.body.starttime;
    const endtime  = req.body.endtime;
    console.log("date",new Date(coursedate))

  
    // CourseModel.findAll({
    //     where: {
    //         //Course_Place: city,
    //         Course_Type: course
    //     },
    //     include:[{
    //         model:CoachModel,
    //         where:{Coach_City:city}
    //     }]
    // })
    CoachModel.findAll({
        where: {
            Coach_City:city
            
        },
        include:[{
            model:CourseModel,
            where:{
              //  Course_Type: course,
                //Course_STime:starttime,
               // Course_ETime:endtime,
                Course_StartDate :{
                    $lte :coursedate
                },
                Course_EndDate :{
                    $gte :coursedate
                },
                Course_Type: course

            }
        }]
    })
        .then(function (result) {
            console.log(result);
            if (result.length > 0) {
                res.status(200).json({
                    msg: "coachlist fetched",
                    coachlist: result
                })
            }
            else {
                res.status(200).json({
                    msg: "no coaches available",
                    coachlist: result
                })
            }

        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
}
