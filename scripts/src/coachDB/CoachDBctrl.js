console.log("in cntrl")
var coach = angular.module('coach')
coach.controller('CoachDBctrl', function ($scope ,$location,Coach) {
  $('#dashboard').addClass('active')
  $('#account').removeClass('active')
  $('#individulacourse').removeClass('active')
//     $scope.getSessionObj={};
//     $scope.signUpObj = {};
    
   
//     $scope.addclass = function () {
        
//         $scope.getSessionObj = JSON.parse(sessionStorage.loginDetailObj);
//         $scope.signUpObj = $scope.getSessionObj[0];

//         console.log($scope.signUpObj);
//     }


//     $scope.goToAccount = function () {

//         $location.path("/OhMyTennis/coach_dashboard/account") 
//     }

//     $scope.saveCoach = function () {

//     $scope.signUpObj.coachImageFile = $('#coachImage')[0].files[0];
//     $scope.signUpObj.coachResumeFile = $('#coachResume')[0].files[0];

//     $scope.signUpObj.Coach_transport = $("input:radio[name=transport]:checked").val()
//     $scope.signUpObj.Coach_payment_type = $("input:radio[name=payment]:checked").val()
//     var Coach_transport = ''; 
//        var inputElements = document.getElementsByClassName('transport');
//        for (var i = 0; inputElements[i]; ++i) {
//           if (inputElements[i].checked) {
//              Coach_transport += inputElements[i].value + ',';
//           }
//        }

//        var Coach_payment_type = '';
//        var inputElements1 = document.getElementsByClassName('payment');
//        for (var i = 0; inputElements1[i]; ++i) {
//           if (inputElements1[i].checked) {
//              Coach_payment_type += inputElements1[i].value + ',';
//           }
//        }


// $scope.signUpObj.Coach_transport = Coach_transport.slice(0, -1);;
// $scope.signUpObj.Coach_payment_type = Coach_payment_type.slice(0, -1);

//     if ($scope.signUpObj.Coach_Email == "" || $scope.signUpObj.Coach_Email == undefined) {
//         alert("Please enter coach email")
//         return;
//      }


//      if ($scope.signUpObj.Coach_Fname == "" || $scope.signUpObj.Coach_Fname == undefined) {
//         alert("Please enter firstname")
//         return;
//      }

//      if ($scope.signUpObj.Coach_Lname == "" || $scope.signUpObj.Coach_Lname == undefined) {
//         alert("Please enter name")
//         return;
//      }


//      if ($scope.signUpObj.Coach_Phone == "" || $scope.signUpObj.Coach_Phone == undefined) {
//         alert("Please enter phone")
//         return;
//      }

//      if ($scope.signUpObj.Coach_City == "" || $scope.signUpObj.Coach_City == undefined) {
//         alert("Please enter city")
//         return;
//      }


//      if ($scope.signUpObj.Coach_Password == "" || $scope.signUpObj.Coach_Password == undefined) {
//         alert("Please enter coach password")
//         return;
//      }



//      if ($scope.signUpObj.Coach_Bank_ACCNum == "" || $scope.signUpObj.Coach_Bank_ACCNum == undefined) {
//         alert("Please enter Account Number")
//         return;
//      }

//      if ($scope.signUpObj.Coach_Bank_Name == "" || $scope.signUpObj.Coach_Bank_Name == undefined) {
//         alert("Please enter bank name")
//         return;
//      }


//      if ($scope.signUpObj.Branch_Code == "" || $scope.signUpObj.Branch_Code == undefined) {
//         alert("Please enter branch code")
//         return;
//      }


//      if ($scope.signUpObj.Coach_Services == "" || $scope.signUpObj.Coach_Services == undefined) {
//         alert("Please enter services")
//         return;
//      }


//      if ($scope.signUpObj.Active_City == "" || $scope.signUpObj.Active_City == undefined) {
//         alert("Please enter city")
//         return;
//      }


//      if ($scope.signUpObj.Coach_Price == "" || $scope.signUpObj.Coach_Price == undefined) {
//         alert("Please enter price")
//         return;
//      }


//      if ($scope.signUpObj.Coach_transport == "" || $scope.signUpObj.Coach_transport == undefined) {
//         alert("Please select transport")
//         return;
//      }


//      if ($scope.signUpObj.Coach_payment_type == "" || $scope.signUpObj.Coach_payment_type == undefined) {
//         alert("Please select payment")
//         return;
//      }

//      if ($scope.signUpObj.coachImageFile == "" || $scope.signUpObj.coachImageFile == undefined) {
//         alert("Please upload profile photo")
//         return;
//      }

//      if ($scope.signUpObj.coachResumeFile == "" || $scope.signUpObj.coachResumeFile == undefined) {
//         alert("Please upload resume")
//         return;
//      }


//     Coach.detailedInsertCoach($scope.signUpObj, function onSuccess(response) 
//     {
   
//         alert(response.msg);
//         //alert(response);
//        // $location.path("OhMyTennis/CoachLogin/")

//     }, function onFailure() {
//     console.log(err)
//     });


       
//     }



//     $scope.addclass();

//     $scope.downloadresume = function () {
//         if($scope.signUpObj.Coach_Resume == null || $scope.signUpObj.Coach_Resume == undefined){
//             alert("Please upload a resume to download")
//             return;
//         }
//         Coach.downloadresume($scope.signUpObj, function onSuccess(response) {
//             // console.log("$scope.signUpObj",$scope.signUpObj.Coach_Resume)
//             // console.log("response",response)
//             var a = document.createElement("a");
//             document.body.appendChild(a);
//             var file = new Blob([response], { type: 'application/pdf' });
//             var fileURL = window.URL.createObjectURL(file);
//             a.href = fileURL;
//             a.download = $scope.signUpObj.Coach_Resume;
//             a.click();

//         }, function onFailure() {
//             console.log(err)
//         });
//     }


// //  $scope.goToDashboard = function () {
// //    console.log('fd');
   
// //    $location.path("OhMyTennis/coach_dashboard/")
// //    }

});

coach.directive('validNumber', function() {
    return {
      require: '?ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
        if(!ngModelCtrl) {
          return; 
        }
  
        ngModelCtrl.$parsers.push(function(val) {
          if (angular.isUndefined(val)) {
              var val = '';
          }
          var clean = val.replace( /[^0-9]+/g, '');
          if (val !== clean) {
            ngModelCtrl.$setViewValue(clean);
            ngModelCtrl.$render();
          }
          return clean;
        });
  
        element.bind('keypress', function(event) {
          if(event.keyCode === 32) {
            event.preventDefault();
          }
        });
      }
    };
  });
 