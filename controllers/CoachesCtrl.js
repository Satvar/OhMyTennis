const CoachModel  = require('../models/coaches')

exports.getallcoaches = (req,res,next) => {
    CoachModel.findAll(). //{where :{Coach_Status : 'verified'}}
    then(data => {
        if (!data) {
            return res.status(404).json({
                msg: "no data"
            })
        }
        res.status(202).json({
            msg: "coach list fetched",
            data: data
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    });
    
}

exports.getcoachbyid = (req,res,next) =>{
const coach_id  = req.body.Coach_ID;
//console.log("ddf",req.body)
CoachModel.findAll({where:{Coach_ID : coach_id}}).then(coaches =>{
   // console.log("coaches",coaches)
  //  console.log("length",coaches.length)
    if(coaches.length == 0){
        return res.status(404).json({
            msg : "something went wrong while fetching coach details"
        })
    }
    res.status(202).json({
        msg: "required details of coach fetched",
        data : coaches[0]
    })
}).catch()
}


