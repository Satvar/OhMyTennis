var coach = angular.module('coach')

    coach.controller('HeaderCtrl', function ($scope ,$location,Coach,$routeParams) {
console.log("heafer")

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

$scope.cityDetails=[{postal:'75116',city:'Paris'},{postal:'06000',city:'Nice'},{postal:'59800',city:'Lille'}]






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


$scope.signUpObj.Coach_City = 'Ev';
$scope.UserConfig.User_City = 'Ev';

$scope.clearValidationUser = function () {

    document.getElementById('genSpan').style.display = 'none';
    document.getElementById('User_FirstName').style.display = 'none';
    document.getElementById('User_Name').style.display = 'none';
    document.getElementById('User_Email').style.display = 'none';
    document.getElementById('codePostal').style.display = 'none';
    document.getElementById('selectCity').style.display = 'none';
    document.getElementById('idPhone').style.display = 'none';

    $("#txtPhone").removeClass("alert_field");
    $("#prenom").removeClass("alert_field");
    $("#nom").removeClass("alert_field");
    $("#email").removeClass("alert_field");
    $("#pw").removeClass("alert_field");
    $("#postalcode").removeClass("alert_field");
    $("#cityDD").removeClass("alert_field"); 
}



$scope.quickRegisterUser = function () {

    var apiFlag='Y';

           // $scope.clearValidationCoach();
             $scope.UserConfig.genPrefix  = $("input[name='is_company']:checked").val();

           // console.log($scope.signUpObj);

            if($scope.UserConfig.genPrefix==undefined)
            {
                document.getElementById('genSpan').style.display = 'block';
                
                apiFlag='N';
            }
           
            if ($scope.UserConfig.User_FirstName == "" || $scope.UserConfig.User_FirstName == undefined) {
                document.getElementById('User_FirstName').style.display = 'block';
                $("#prenom").addClass("alert_field");
                apiFlag='N';
               
            }



            if ($scope.UserConfig.User_Name == "" || $scope.UserConfig.User_Name == undefined) {
                document.getElementById('User_Name').style.display = 'block';
                $("#nom").addClass("alert_field");
                apiFlag='N';
            }


            if ($scope.UserConfig.User_Email == "" || $scope.UserConfig.User_Email == undefined) {
                document.getElementById('User_Email').style.display = 'block';
                $("#email").addClass("alert_field");
                apiFlag='N';
                
            }

            

            if ($scope.UserConfig.User_Password == "" || $scope.UserConfig.User_Password == undefined) {
                $scope.flag =true;
                $("#pw").addClass("alert_field");
                apiFlag='N';
                
            }

            if($scope.UserConfig.postal==""||$scope.UserConfig.postal==undefined)
            {
                document.getElementById('codePostal').style.display = 'block';
                $("#postalcode").addClass("alert_field");
                apiFlag='N';
            }


            if ($scope.UserConfig.User_City == "Ev" || $scope.UserConfig.User_City == undefined) {
                document.getElementById('selectCity').style.display = 'block';
                $("#cityDD").addClass("alert_field");
                apiFlag='N';
            }


           
            if ($scope.UserConfig.User_Phone == "" || $scope.UserConfig.User_Phone == undefined) {

                document.getElementById('idPhone').style.display = 'block';
                $("#txtPhone").addClass("alert_field");
                apiFlag='N';
            }


            if(apiFlag=='Y')
            {
                Coach.quickInsertUser($scope.UserConfig, function onSuccess(response) {
                    console.log("response", response)
            
                    
                    $scope.closeUserModal();
                    $scope.details = response;

                    if(response.errCode==505)
                    { 
                        $('#userEmailIdExistMod').modal('show');
                    }
                    else
                    {
                        $('#userSuccess').modal('show');
                    }


                   // alert(response.message)
                }, function onFailure() {
                    console.log(err)
                });
            }
    
    
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

$scope.selectCity = function () {

    if(((document.getElementById('postalcode').value).length)==5)
    {
        for (var i = 0; i < $scope.cityDetails.length; i++) { 
            console.log($scope.cityDetails[i].postal);
            console.log(document.getElementById('postalcode').value);

            console.log($scope.cityDetails[i].postal==document.getElementById('postalcode').value)

            if($scope.cityDetails[i].postal==document.getElementById('postalcode').value)
            {
                console.log($scope.cityDetails[i].postal);
                $scope.signUpObj.Coach_City = $scope.cityDetails[i].city
                console.log($scope.signUpObj.Coach_City);
            }
          }
    }
    else
    {
        $scope.signUpObj.Coach_City = 'Ev';
    }

}

$scope.selectCityUser = function () {

    if(((document.getElementById('postalcode').value).length)==5)
    {
        for (var i = 0; i < $scope.cityDetails.length; i++) { 
            console.log($scope.cityDetails[i].postal);
            console.log(document.getElementById('postalcode').value);

            console.log($scope.cityDetails[i].postal==document.getElementById('postalcode').value)

            if($scope.cityDetails[i].postal==document.getElementById('postalcode').value)
            {
                console.log($scope.cityDetails[i].postal);
                $scope.UserConfig.User_City = $scope.cityDetails[i].city
               // console.log($scope.signUpObj.Coach_City);
            }
          }
    }
    else
    {
        $scope.UserConfig.User_City = 'Ev';
    }

}


$scope.telePhone = function () {

    if(($scope.signUpObj.Coach_Phone).length<10) 
    {
        document.getElementById('forPhone').style.display = 'block';
        $("#txtPhone").addClass("alert_field");
    }
    else
    {
        document.getElementById('forPhone').style.display = 'none';
        $("#txtPhone").removeClass("alert_field");
    }
}


$scope.telePhoneUser = function () {

    if(($scope.UserConfig.User_Phone).length<10) 
    {
        document.getElementById('forPhone').style.display = 'block';
        $("#txtPhone").addClass("alert_field");
    }
    else
    {
        document.getElementById('forPhone').style.display = 'none';
        $("#txtPhone").removeClass("alert_field");
    }
}




$scope.clearValidationCoach = function () {

    document.getElementById('genSpan').style.display = 'none';
    document.getElementById('Coach_Fname').style.display = 'none';
    document.getElementById('Coach_Lname').style.display = 'none';
    document.getElementById('Coach_Email').style.display = 'none';
    document.getElementById('codePostal').style.display = 'none';
    document.getElementById('selectCity').style.display = 'none';
    document.getElementById('idPhone').style.display = 'none';

    $("#txtPhone").removeClass("alert_field");
    $("#prenom").removeClass("alert_field");
    $("#nom").removeClass("alert_field");
    $("#email").removeClass("alert_field");
    $("#pw").removeClass("alert_field");
    $("#postalcode").removeClass("alert_field");
    $("#cityDD").removeClass("alert_field"); 
}



        $scope.gotoRegisterCoach = function () {

            var apiFlag='Y';

            $scope.clearValidationCoach();
             $scope.signUpObj.genPrefix  = $("input[name='is_company']:checked").val();

            console.log($scope.signUpObj);

            if($scope.signUpObj.genPrefix==undefined)
            {
                document.getElementById('genSpan').style.display = 'block';
                
                apiFlag='N';
            }
           
            if ($scope.signUpObj.Coach_Fname == "" || $scope.signUpObj.Coach_Fname == undefined) {
                document.getElementById('Coach_Fname').style.display = 'block';
                $("#prenom").addClass("alert_field");
                apiFlag='N';
               
            }



            if ($scope.signUpObj.Coach_Lname == "" || $scope.signUpObj.Coach_Lname == undefined) {
                document.getElementById('Coach_Lname').style.display = 'block';
                $("#nom").addClass("alert_field");
                apiFlag='N';
            }


            if ($scope.signUpObj.Coach_Email == "" || $scope.signUpObj.Coach_Email == undefined) {
                document.getElementById('Coach_Email').style.display = 'block';
                $("#email").addClass("alert_field");
                apiFlag='N';
                
            }

            

            if ($scope.signUpObj.Coach_Password == "" || $scope.signUpObj.Coach_Password == undefined) {
                $scope.flag =true;
                $("#pw").addClass("alert_field");
                apiFlag='N';
                
            }

            if($scope.signUpObj.postal==""||$scope.signUpObj.postal==undefined)
            {
                document.getElementById('codePostal').style.display = 'block';
                $("#postalcode").addClass("alert_field");
                apiFlag='N';
            }


            if ($scope.signUpObj.Coach_City == "Ev" || $scope.signUpObj.Coach_City == undefined) {
                document.getElementById('selectCity').style.display = 'block';
                $("#cityDD").addClass("alert_field");
                apiFlag='N';
            }


           
            if ($scope.signUpObj.Coach_Phone == "" || $scope.signUpObj.Coach_Phone == undefined) {

                document.getElementById('idPhone').style.display = 'block';
                $("#txtPhone").addClass("alert_field");
                apiFlag='N';
            }


           if(apiFlag=='Y')
           {

                console.log("apiFlag")

                Coach.quickInsertCoach($scope.signUpObj, function onSuccess(response) {
                    var regUser ={};
                    console.log("in register")
                    $scope.signUpObj = {};
                    $scope.flag =false;
                    
                    regUser = response;

                    console.log(regUser.errCode);


                     if(response.errCode==505)
                    { 
                        $('#emailIdExistMod').modal('show');
                    }
                    else
                    {
                        $('#successModal').modal('show');
                    }
                   

                   


                    //angular.element('#coachModal').modal('hide');

                }, function onFailure() {
                    console.log(err)
                });
        }
        } 

$scope.goToAdminPanel = function () {

    $location.path("OhMyTennis/AdminPanel/")
}

$scope.goToCoachRegistration = function () {
    $location.path("OhMyTennis/CoachRegister/")
}

$scope.goToUserRegistration = function () {
    $location.path("OhMyTennis/UserRegister/")
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