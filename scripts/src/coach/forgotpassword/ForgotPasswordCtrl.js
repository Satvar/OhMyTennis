var coach = angular.module('coach')

coach.controller('ForgotPasswordCtrl', function ($scope, Coach,$location) {
    $scope.emailexistflag = true;
    $scope.CoachObj = {};


    $scope.clearValidation=function()
    {
        $("#email").removeClass("alert_field");
        document.getElementById('emailVal').style.display = 'none';
        
    }
    $scope.resetPassword = function(){

        if($scope.CoachObj.Coach_Email=="" || $scope.CoachObj.Coach_Email==undefined)
        {
            $("#email").addClass("alert_field");
            document.getElementById('emailVal').style.display = 'block';
            return;
        }

        Coach.forgotpassword($scope.CoachObj,function onSuccess(response) {
            $("#email").removeClass("alert_field");
            document.getElementById('emailVal').style.display = 'none';
            if(response.code == '203'){
              //  alert("Email Id does not exist")
                $scope.emailexistflag = false;
            }
            
            else
            {
                $scope.emailexistflag = true;
                $('#passwordSent').modal('show');
               // alert("Password link has been sent to the registered Email.")
            }
           
        }, function onFailure() {
           console.log(err)
        });
    }

    $scope.gobacktoLoginpage = function(){
        $location.url("/OhMyTennis/CoachLogin/")
    }
    
})
  