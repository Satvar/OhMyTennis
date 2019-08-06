
var coach = angular.module('coach')

//console.log("in coach cntrl")

coach.controller('CoachCtrl', function ($scope, Coach,$location) {
  
$scope.CoachConfig ={};
$scope.commonflag = true;
$scope.emailflag = true;


   if (sessionStorage.getItem("coachLoginFlag") == 'Y') {
      $location.path("OhMyTennis/coach_dashboard/")
   }    

 
   $scope.coachlogin = function () {
     // console.log("in coach login")
      if ($scope.CoachConfig.Coach_Email == "" || $scope.CoachConfig.Coach_Email == undefined) {
         alert("Please enter user email")
         return;
      }


      if ($scope.CoachConfig.Coach_Password == "" || $scope.CoachConfig.Coach_Password == undefined) {
         alert("Please enter user password")
         return;
      }

      Coach.coachSignIn($scope.CoachConfig, function onSuccess(response) {
         console.log(response);
         if(response.code == 200){
            sessionStorage.setItem("coachLoginFlag", "Y");
            sessionStorage.setItem('loginDetailObj', JSON.stringify(response.coachlist))
            $location.path("OhMyTennis/coach_dashboard/")
         }
         if(response.code == 204){
            sessionStorage.setItem("coachLoginFlag", "N");
           // alert("credentials does not match")
            $scope.commonflag =false
            $scope.emailflag= true;
         }
         if(response.code == 203){
            $scope.emailflag= false;
            sessionStorage.setItem("coachLoginFlag", "N");
          // alert("username doesnot exist")
         }

         // if (response.errCode == 200) {
         //    sessionStorage.setItem('loginDetailObj', JSON.stringify(response.coachlist))
         //    $location.path("OhMyTennis/coach_dashboard/")
         // }
         // else {
         //    $scope.checkvalidity = false;
         //   // console.log("in coach login")
         //   // alert(response.msg)
         // }
         // $scope.CoachConfig = {};
      }, function onFailure() {
         console.log(err)
      });
   }

   function getParameter( name, url ) {
      if (!url) url = location.href;
      name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
      var regexS = "[\\?&]"+name+"=([^&#]*)";
      var regex = new RegExp( regexS );
      var results = regex.exec( url );
      return results == null ? null : results[1];
   }
   //console.log(gup('emailVerificationFlag', window.location.href));
   
   
      $scope.getIfConfirmEmail = function () {
   
         if(getParameter('emailVerificationFlag', window.location.href)=='1')
         {
            alert("Thanks for verifying your email address")
         }
      }
      function getParameter( name, url ) {
   if (!url) url = location.href;
   name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
   var regexS = "[\\?&]"+name+"=([^&#]*)";
   var regex = new RegExp( regexS );
   var results = regex.exec( url );
   return results == null ? null : results[1];
}
//console.log(gup('emailVerificationFlag', window.location.href));


   $scope.getIfConfirmEmail = function () {

      if(getParameter('emailVerificationFlag', window.location.href)=='1')
      {
         alert("Thanks for verifying your email address")
      }
   }
   $scope.getIfConfirmEmail();

   $scope.gobacktohomepage = function(){
      $location.path("/OhMyTennis")
   }

   $scope.gotToForgotPassword = function(){
      $location.path("/OhMyTennis/CoachLogin/forgotpassword")
   }

   $scope.signup = function(){
    
      sessionStorage.setItem("openRegModal", "Y");
      $location.path("/OhMyTennis")
   }
});