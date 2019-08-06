var coach = angular.module('coach')

coach.controller('ForgotPasswordCtrl', function ($scope, Coach,$location) {
    $scope.emailexistflag = true;
    $scope.CoachObj = {};

    $scope.resetPassword = function(){
        Coach.forgotpassword($scope.CoachObj,function onSuccess(response) {
            if(response.code == '203'){
              //  alert("Email Id does not exist")
                $scope.emailexistflag = false;
            }
            
            else
            {
                $scope.emailexistflag = true;
                alert("Password link has been sent to the registered Email.")
            }
           
        }, function onFailure() {
           console.log(err)
        });
    }

    $scope.gobacktoLoginpage = function(){
        $location.url("/OhMyTennis/CoachLogin/")
    }
    
})
  