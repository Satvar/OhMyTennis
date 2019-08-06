var coach = angular.module('coach')

coach.controller('userResetPasswordCtrl', function ($scope, Coach,$location,$stateParams) {
 $scope.resetObj ={};
 $scope.pflag =false;
 $scope.cflag = false;
  
 function getParameter( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
 }
 $scope.validatePassword=function(passwordField){
    console.log("vaalues",passwordField)
    var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/;

    if (reg.test(passwordField) == false) 
    {
        $scope.pflag =true;
        return false;
    }
     $scope.flag= false;
    return true;

}

    $scope.resetObj.User_Email = getParameter('User_Email', window.location.href)

    $scope.setnewpassword = function () {
       // console.log("in reset",$scope.resetObj.Coach_Email)
        if(!$scope.validatePassword($scope.resetObj.User_Password)){
              return;
        }
        if ($scope.resetObj.User_Password != $scope.user_rPassword) {
            $scope.cflag = true;
            $scope.pflag = false;
             //alert("passwords do not match")
        }
        else {
            Coach.setNewPasswordUser($scope.resetObj, function onSuccess(response) {
                // console.log("response", response)
                $scope.details = response;
                $scope.emailflag =false;
                alert("password updated successfully")
                $location.url('/OhMyTennis/UserLogin/')
            }, function onFailure() {
                console.log(err)
            });
        }

     }


})