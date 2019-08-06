console.log("in course ctrl")
var coach = angular.module('coach')
coach.controller('IndividualCourseCtrl', function ($scope, $location, Coach) {
    $('#individulacourse').addClass('active')
    $('#account').removeClass('active')
    $('#dashboard').removeClass('active')
$scope.dataConfig={};
$scope.courselist =[];
$scope.getSessionObj = JSON.parse(sessionStorage.loginDetailObj);
console.log("$scope.getSessionObj",$scope.getSessionObj[0].Coach_ID)
$scope.CoachId = $scope.getSessionObj[0].Coach_ID;
console.log("$scope.dataConfig",$scope.CoachId)

    $scope.savecourse = function () {
       // console.log("model date",$scope.datess)
        console.log("datestart",$('#datePickerstart').find('input').val())
        console.log("dateend",$('#datePickerend').find('input').val())
        console.log("timestart",$('#datetimepickerstart').find('input').val())
        console.log("timeend",$('#datetimepickerend').find('input').val())
        console.log("image", $('#courseimage')[0].files[0])
        //console.log("datesss",$scope.dataConfig.Course_StartDate)
        $scope.dataConfig.Coach_ID = $scope.CoachId
        $scope.dataConfig.Course_Transport = $("input:checkbox[name=transport]:checked").val()
        $scope.dataConfig.Course_Image = $('#courseimage')[0].files[0];
        $scope.dataConfig.Course_StartDate = $('#datePickerstart').find('input').val();
        $scope.dataConfig.Course_EndDate = $('#datePickerend').find('input').val();
        $scope.dataConfig.Course_STime = $('#datetimepickerstart').find('input').val();
        $scope.dataConfig.Course_ETime = $('#datetimepickerend').find('input').val();
        
        var Course_transport = ''; 
        var inputElements = document.getElementsByClassName('transport');
        for (var i = 0; inputElements[i]; ++i) {
           if (inputElements[i].checked) {
            Course_transport += inputElements[i].value + ',';
           }
        }
        $scope.dataConfig.Course_Transport = Course_transport.slice(0, -1);
        console.log("$scope.dataConfig.Course_Transport",$scope.dataConfig.Course_Transport)
        Coach.insertIndividualCourse($scope.dataConfig, function onSuccess(response) {
            $scope.courselist = response.list;
            console.log("$scope.courselist", response.list)
        }, function onFailure() {
            console.log(err)
        });
    }

})
