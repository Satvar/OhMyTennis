var coach = angular.module('coach')

    coach.controller('HeaderCtrl', function ($scope ,$location,Coach,$routeParams) {
//console.log("heafer")

if(sessionStorage.getItem("openRegModal")=='Y')
{
    sessionStorage.setItem("openRegModal", "N");
    $('#coachModal').modal('show');

}

if(sessionStorage.getItem("openRegModalUser")=='Y')
{
    sessionStorage.setItem("openRegModalUser", "N");
    $('#UserModal').modal('show');

}




$scope.validatePassword=function(passwordField){
    console.log("vaalues",passwordField)
    var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/;

    if (reg.test(passwordField) == false) 
    {
        $scope.flag =true;
       // alert('Invalid Password');
        return false;
    }
     $scope.flag= false;
    return true;

}



$scope.UserConfig = {};
$scope.signUpObj = {};
$scope.quickRegisterUser = function () {
    if ($scope.UserConfig.User_Email == "" || $scope.UserConfig.User_Email == undefined) {
        alert("Please enter valid email")
        return;
    }
    if ($scope.UserConfig.User_FirstName == "" || $scope.UserConfig.User_FirstName == undefined) {
        alert("Please enter first name")
        return;
    }
    if ($scope.UserConfig.User_Name == "" || $scope.UserConfig.User_Name == undefined) {
        alert("Please enter name")
        return;
    }
    if ($scope.UserConfig.User_Phone == "" || $scope.UserConfig.User_Phone == undefined) {
        alert("Please enter Phone")
        return;
    }
    if ($scope.UserConfig.User_Password == "" || $scope.UserConfig.User_Password == undefined) {
        alert("Please enter password")
        return;
    }
    if(!$scope.validatePassword($scope.UserConfig.User_Password)){
        alert("Please enter password matching the given condition")
        return;
    }

    if ($scope.UserConfig.User_City == "" || $scope.UserConfig.User_City == undefined) {
        alert("Please enter city")
        return;
    }
    Coach.quickInsertUser($scope.UserConfig, function onSuccess(response) {
        console.log("response", response)

        
        $scope.closeUserModal();
        $scope.details = response;
        alert(response.message)
    }, function onFailure() {
        console.log(err)
    });
}

$scope.closeUserModal  = function(){
    $scope.UserConfig = {};
    $('#UserModal').modal('hide'); 
    $('body').removeClass('modal-open'); 
    $('.modal-backdrop').remove();
    $scope.flag =false;
   // angular.element('#UserModal').modal('hide');
}
 
$scope.goToUserLogin = function () {
  //  $('#LoginModal').modal('hide'); 
    $('body').removeClass('modal-open'); 
    $('.modal-backdrop').remove();
     $location.url("/OhMyTennis/UserLogin/")

   
}

$scope.goToCoachLogin = function(){
   // $('#LoginModal').modal('hide'); 
    $('body').removeClass('modal-open'); 
    $('.modal-backdrop').remove();
     $location.url("/OhMyTennis/CoachLogin/")

}  
        $scope.gotoRegisterCoach = function () {

            if ($scope.signUpObj.Coach_Email == "" || $scope.signUpObj.Coach_Email == undefined) {
                alert("Please enter valid email")
                return;
            }

            if ($scope.signUpObj.Coach_Fname == "" || $scope.signUpObj.Coach_Fname == undefined) {
                alert("Please enter firstname")
                return;
            }
            if ($scope.signUpObj.Coach_Lname == "" || $scope.signUpObj.Coach_Lname == undefined) {
                alert("Please enter lastname")
                return;
            }
            if ($scope.signUpObj.Coach_Phone == "" || $scope.signUpObj.Coach_Phone == undefined) {
                alert("Please enter phonenumber")
                return;
            }
            if ($scope.signUpObj.Coach_Password == "" || $scope.signUpObj.Coach_Password == undefined) {
                alert("Please enter password")
                return;
            }
            if(!$scope.validatePassword($scope.signUpObj.Coach_Password)){
                alert("Please enter passowrd matching the given condtion")
                return;
            }
            if ($scope.signUpObj.Coach_City == "" || $scope.signUpObj.Coach_City == undefined) {
                alert("Please enter city")
                return;
            }

            console.log($scope.signUpObj)

            Coach.quickInsertCoach($scope.signUpObj, function onSuccess(response) {
                console.log("in register")
                $scope.signUpObj = {};
                $scope.flag =false;
                alert(response.message);
                if (response.errCode != 505) {
                    $('#coachModal').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                }

                //angular.element('#coachModal').modal('hide');

            }, function onFailure() {
                console.log(err)
            });
        } 

$scope.goToAdminPanel = function () {

    $location.path("OhMyTennis/AdminPanel/")
}

$scope.gotoohmycoaches = function () {
console.log("ffg")
sessionStorage.clear();
   // $location.path("/OhMyCoaches/")
   $('#concept').removeClass('active')
   $('#coaches').addClass('active')
}

$scope.closeCoachModal  = function(){
    $scope.signUpObj = {};
    $('#coachModal').modal('hide'); 
    $('body').removeClass('modal-open'); 
    $('.modal-backdrop').remove();
    $scope.flag =false;
   // angular.element('#UserModal').modal('hide');
}

    })