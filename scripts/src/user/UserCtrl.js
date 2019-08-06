var coach = angular.module('coach')
//console.log("in user cntrl")

coach.directive('demoFileModel', function ($parse) {
  return {
      restrict: 'A', //the directive can be used as an attribute only
      link: function (scope, element, attrs) {
          var model = $parse(attrs.demoFileModel),
              modelSetter = model.assign; //define a setter for demoFileModel

          //Bind change event on the element
          element.bind('change', function () {
              //Call apply on scope, it checks for value changes and reflect them on UI
              scope.$apply(function () {
                  //set the model value
                  modelSetter(scope, element[0].files[0]);
              });
          });
      }
  };
});

coach.controller('UserCtrl', function ($scope, Coach,$location) {
  console.log("userctrl")

  $scope.UserConfig = {};
  $scope.commonflag = true;
  $scope.emailflag = true;
  if (sessionStorage.getItem("userLoginFlag") == 'Y') {
    $location.path("OhMyTennis")
  }

  $scope.userlogin = function () {
    if ($scope.UserConfig.User_Email == "" || $scope.UserConfig.User_Email == undefined) {
      alert("Please enter user email")
      return;
    }


    if ($scope.UserConfig.User_Password == "" || $scope.UserConfig.User_Password == undefined) {
      alert("Please enter user password")
      return;
    }


    Coach.userSignIn($scope.UserConfig, function onSuccess(response) {
      $scope.details = response;
      //alert(response.msg)
    //   if (response.errCode == 200) {
    //     sessionStorage.setItem('UserDetailObj', JSON.stringify(response.userlist))
    //     $location.path("/OhMyTennis")
    //  }
    //  else {
    //     //console.log("in user login")
    //     alert(response.msg)
    //  }
    //   $scope.UserConfig = {};
      if (response.code == 200) {
        sessionStorage.setItem("userLoginFlag", "Y");
        sessionStorage.setItem('UserDetailObj', JSON.stringify(response.userlist))
        $location.path("OhMyTennis")
      }
      if (response.code == 204) {
        sessionStorage.setItem("userLoginFlag", "N");
        // alert("credentials does not match")
        $scope.commonflag = false
        $scope.emailflag = true;
      }
      if (response.code == 203) {
        sessionStorage.setItem("userLoginFlag", "N");
        $scope.emailflag = false;
        // alert("username doesnot exist")
      }
    }, function onFailure() {
      console.log(err)
    });
  }


  $scope.saveuser = function () {
    var file = $scope.myFile;
    var UserConfig = {}
    UserConfig.User_FirstName = $scope.name;
    UserConfig.User_profileimage = file;
    UserConfig.User_Email = $scope.email;
    Coach.detailedInsertUser(UserConfig, function onSuccess(response) {
     // console.log("response", response)
      $scope.details = response;
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
 

  $scope.getIfConfirmEmail = function () {
    console.log('1234');

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
  $location.path("/OhMyTennis/UserLogin/forgotpassword")
}

$scope.signup = function(){
    
  sessionStorage.setItem("openRegModalUser", "Y");
  $location.path("/OhMyTennis")
}


});