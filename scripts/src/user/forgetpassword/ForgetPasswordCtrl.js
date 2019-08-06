var coach = angular.module('coach')

coach.controller('ForgetPasswordCtrl', function ($scope, Coach,$location) {
    $scope.emailexistflag = true;
    $scope.UserObj = {};

    $scope.resetPassword = function(){
        Coach.forgotpasswordUser($scope.UserObj,function onSuccess(response) {
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
        $location.url("/OhMyTennis/UserLogin/")

    }
})
  