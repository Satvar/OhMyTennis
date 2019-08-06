var coach = angular.module('coach')
coach.controller('OhMyCoachesCtrl', function ($scope ,$location,Coach,$routeParams) {
    console.log("in detail cntrl")
    $scope.getcoachobj = {};
    $scope.coachdetails={};

$scope.getcoachobj.Coach_ID = sessionStorage.getItem('coachid');
    $scope.getcoachdetails = function () {
        Coach.getcoachbyid($scope.getcoachobj, function onSuccess(response) {
            $scope.coachdetails = response.data;
            console.log("$scope.coachdetails11", $scope.coachdetails)
        }, function onFailure() {
            console.log(err)
        });
    }

    $scope.getcoachdetails();

    

    // ====search function ===============

    $scope.SearchObj = {};
    $scope.searchcoach = function () {
        console.log("in search ")
        sessionStorage.setItem('SearchObj', JSON.stringify($scope.SearchObj));
        sessionStorage.setItem('searchflag', 'y');
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