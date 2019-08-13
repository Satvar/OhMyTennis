
var coach = angular.module('coach')

//console.log("in coach cntrl")

coach.controller('CoachCtrl', function ($scope, Coach,$location) {
  
$scope.CoachConfig ={};
$scope.commonflag = true;
$scope.emailflag = true;



   if (sessionStorage.getItem("coachLoginFlag") == 'Y') {
      $location.path("OhMyTennis/coach_dashboard/")
   }    


   $scope.clearValidation = function () {

      document.getElementById('Coach_Email').style.display = 'none';
      $("#email").removeClass("alert_field");

      document.getElementById('Coach_Password').style.display = 'none';
      $("#password").removeClass("alert_field");
      
   }



 
   $scope.coachlogin = function () {

      if ($scope.CoachConfig.Coach_Email == "" || $scope.CoachConfig.Coach_Email == undefined) {
         document.getElementById('Coach_Email').style.display = 'block';
         $("#email").addClass("alert_field");
         return;
      }


      if ($scope.CoachConfig.Coach_Password == "" || $scope.CoachConfig.Coach_Password == undefined) {
        
         document.getElementById('Coach_Password').style.display = 'block';
         $("#password").addClass("alert_field");

         return;
      }

      
      Coach.coachSignIn($scope.CoachConfig, function onSuccess(response) {
         
         $scope.chkUser={};

        
         console.log($scope.chkUser);
         if(response.code == 200){
            $scope.chkUser=response.coachlist[0];

           console.log($scope.chkUser.User_type);

           if($scope.chkUser.User_type=='coach')
           {

            document.getElementById('errMsg').style.display = 'none';
            sessionStorage.setItem("coachLoginFlag", "Y");
            sessionStorage.setItem('loginDetailObj', JSON.stringify($scope.chkUser))

            $location.path("OhMyTennis/coach_dashboard/");

           }
           else
           {
            document.getElementById('errMsg').style.display = 'none';
            sessionStorage.setItem("userLoginFlag", "Y");
            sessionStorage.setItem('loginDetailObj', JSON.stringify($scope.chkUser))

            $location.path("OhMyTennis");
           }

         }
         else
         {
            document.getElementById('errMsg').style.display = 'block';
         }

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

   
   
      
      function getParameter( name, url ) {
   if (!url) url = location.href;
   name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
   var regexS = "[\\?&]"+name+"=([^&#]*)";
   var regex = new RegExp( regexS );
   var results = regex.exec( url );
   return results == null ? null : results[1];
}


   $scope.getIfConfirmEmail = function () {

      if(getParameter('emailVerificationFlag', window.location.href)=='1')
      {
         document.getElementById('alertVerify').style.display = 'block';
       //  alert("Thanks for verifying your email address")
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