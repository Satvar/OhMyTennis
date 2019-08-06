
console.log("in side")
var coach = angular.module('coach')
coach.controller('SideBarCtrl', function ($scope, $location, Coach) {

    $scope.goToDashboard = function () {
        $('#dashboard').addClass('active')
        $('#account').removeClass('active')
        $('#individulacourse').removeClass('active')

        $location.path("OhMyTennis/coach_dashboard/")
    }

    $scope.goToAccount = function () {
        $('#account').addClass('active')
        $('#individulacourse').removeClass('active')
        $('#dashboard').removeClass('active')
        $location.path("/OhMyTennis/coach_dashboard/account")
    }

    $scope.goToIndividualcourse = function () {
        $('#individulacourse').addClass('active')
        $('#account').removeClass('active')
        $('#dashboard').removeClass('active')
        $location.path("/OhMyTennis/coach_dashboard/individualcourse")
    }

})