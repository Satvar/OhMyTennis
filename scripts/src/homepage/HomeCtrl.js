
//console.log("in home ctrl")

var coach = angular.module('coach')

    coach.controller('HomeCtrl', function ($scope ,$location,Coach,$routeParams) {
       // document.getElementById("mainheader").style.display = 'block';
        $scope.UserConfig = {};
      //  $scope.CoachConfig = {};
        $scope.coachlist = [];
        $scope.signUpObj = {};
        $scope.coachdetails = [];

        console.log("in home ctrl")
  //   ============landing page  functions ========================     

       $scope.getallcoacheslist = function(){
           console.log("in function")
        Coach.getallcoaches(function onSuccess(response) {
          $scope.coachlist = response.data;
          console.log("response",$scope.coachlist)
      }, function onFailure() {
         console.log(err)
      });
     
     }
     $scope.getallcoacheslist();

     $scope.gotocoachdetails = function(coach_id){
         console.log("in get details function",coach_id)
         sessionStorage.setItem('coachid',coach_id);
         $location.url("/OhMyCoaches/details")
     
        

     }
    
//   ============user functions ========================

        // $scope.quickRegisterUser = function () {
        //     if ($scope.UserConfig.User_Email == "" || $scope.UserConfig.User_Email == undefined) {
        //         alert("Please enter valid email")
        //         return;
        //     }
        //     if ($scope.UserConfig.User_FirstName == "" || $scope.UserConfig.User_FirstName == undefined) {
        //         alert("Please enter first name")
        //         return;
        //     }
        //     if ($scope.UserConfig.User_Name == "" || $scope.UserConfig.User_Name == undefined) {
        //         alert("Please enter name")
        //         return;
        //     }
        //     if ($scope.UserConfig.User_Phone == "" || $scope.UserConfig.User_Phone == undefined) {
        //         alert("Please enter Phone")
        //         return;
        //     }
        //     if ($scope.UserConfig.User_Password == "" || $scope.UserConfig.User_Password == undefined) {
        //         alert("Please enter password")
        //         return;
        //     }
        //     Coach.quickInsertUser($scope.UserConfig, function onSuccess(response) {
        //         console.log("response", response)
        //         $scope.closeUserModal();
        //         $scope.details = response;
        //     }, function onFailure() {
        //         console.log(err)
        //     });
        // }

        // $scope.closeUserModal  = function(){
        //     $scope.UserConfig = {};
        //     $('#UserModal').modal('hide'); 
        //     $('body').removeClass('modal-open'); 
        //     $('.modal-backdrop').remove();
        //    // angular.element('#UserModal').modal('hide');
        // }
         
        // $scope.goToUserLogin = function () {
        //     $('#LoginModal').modal('hide'); 
        //     $('body').removeClass('modal-open'); 
        //     $('.modal-backdrop').remove();
        //      $location.url("/OhMyTennis/UserLogin/")

           
        // }


        // ============coach functions ========================
        
        // $scope.goToCoachLogin = function(){
        //     $('#LoginModal').modal('hide'); 
        //     $('body').removeClass('modal-open'); 
        //     $('.modal-backdrop').remove();
        //      $location.url("/OhMyTennis/CoachLogin/")

        // }  
        // $scope.gotoRegisterCoach = function () {

        //     if ($scope.signUpObj.Coach_Email == "" || $scope.signUpObj.Coach_Email == undefined) {
        //         alert("Please enter valid email")
        //         return;
        //         }
        //         if ($scope.signUpObj.Coach_Fname == "" || $scope.signUpObj.Coach_Fname == undefined) {
        //         alert("Please enter firstname")
        //         return;
        //         }
        //         if ($scope.signUpObj.Coach_Lname == "" || $scope.signUpObj.Coach_Lname == undefined) {
        //         alert("Please enter lastname")
        //         return;
        //         }
        //         if ($scope.signUpObj.Coach_Phone == "" || $scope.signUpObj.Coach_Phone == undefined) {
        //         alert("Please enter phonenumber")
        //         return;
        //         }
        //         if ($scope.signUpObj.Coach_Password == "" || $scope.signUpObj.Coach_Password == undefined) {
        //         alert("Please enter password")
        //         return;
        //         }
        //         if ($scope.signUpObj.Coach_City == "" || $scope.signUpObj.Coach_City == undefined) {
        //         alert("Please enter city")
        //         return;
        //         }

        //     console.log($scope.signUpObj)

        //     Coach.quickInsertCoach($scope.signUpObj, function onSuccess(response) {
        //        console.log("in register")
        //         $scope.signUpObj = {};
        //         alert(response.message);
        //         if(response.errCode != 505){
        //             $('#coachModal').modal('hide'); 
        //             $('body').removeClass('modal-open'); 
        //             $('.modal-backdrop').remove();
        //         }
                
        //         //angular.element('#coachModal').modal('hide');

        //     }, function onFailure() {
        //         console.log(err)
        //     });
        // }      
            
    //    ===================admin  functions ==========

        // $scope.goToAdminPanel = function () {

        //     $location.path("OhMyTennis/AdminPanel/")
        // }
    // ====search function ===============
   
    $scope.SearchObj = {};
    $scope.searchcoach = function(){
        console.log("in search ")
        $scope.SearchObj.date = $('#datePicker1').find('input').val();

        console.log($scope.SearchObj);

        sessionStorage.setItem('SearchObj', JSON.stringify($scope.SearchObj));
        $location.url("/OhMyTennis/searchcoach/")
    }
        

    });

coach.directive('validNumber', function () {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            if (!ngModelCtrl) {
                return;
            }
            ngModelCtrl.$parsers.push(function (val) {
                if (angular.isUndefined(val)) {
                    var val = '';
                }
                var clean = val.replace(/[^0-9]+/g, '');
                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });
            element.bind('keypress', function (event) {
                if (event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
    };

    
});



