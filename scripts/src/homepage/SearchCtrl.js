var coach = angular.module('coach')
coach.controller('SearchCtrl', function ($scope, $location, Coach, $routeParams) {
    $scope.coachdetails =[];
    $scope.getseaarchobj = {};
    $('#concept').removeClass('active')
    $('#coaches').addClass('active')
    $scope.coachdetailsCity =[];

    $scope.searchcoach = function () {
        if(sessionStorage.SearchObj !=undefined){
            console.log("sessionStorage.SearchObj",sessionStorage.SearchObj)
            $scope.getseaarchobj = JSON.parse(sessionStorage.SearchObj);
            console.log("$scope.getseaarchobj",$scope.getseaarchobj)
            Coach.search_for_coach($scope.getseaarchobj, function onSuccess(response) {

               $scope.coachdetailsCity = response.coachlist;
               // console.log("$scope.coachdetails", $scope.coachdetailsCity)

               
                    console.log($scope.getseaarchobj.date);
                
                for (var i = 0; i < $scope.coachdetailsCity.length; i++) 
                {

                    console.log(moment($scope.getseaarchobj.date).isAfter(moment($scope.coachdetailsCity[i].Availability_StartDate))
                    &&moment($scope.getseaarchobj.date).isBefore(moment($scope.coachdetailsCity[i].Availability_EndDate)));
                   
                    
                    if(moment($scope.getseaarchobj.date).isAfter(moment($scope.coachdetailsCity[i].Availability_StartDate))
                    &&moment($scope.getseaarchobj.date).isBefore(moment($scope.coachdetailsCity[i].Availability_EndDate)))
                    {
                        $scope.coachdetails.push($scope.coachdetailsCity[i])
                    }
                    
                }



                
            }, function onFailure() {
                console.log(err)
            });
        }
        else{
            Coach.getallcoaches(function onSuccess(response) {
                $scope.coachdetails = response.data;
                console.log("response",$scope.coachdetails)
            }, function onFailure() {
               console.log(err)
            });
        }

    }

    $scope.searchcoach();

        // ====search function ===============

        $scope.SearchObj = {};
        $scope.searchcoach1 = function () {
            console.log("in search ")
            sessionStorage.setItem('SearchObj', JSON.stringify($scope.SearchObj));
           $scope.searchcoach();
        }
        $scope.cities =[];
        $scope.getcities = function(){
            Coach.getallcoaches(function onSuccess(response) {
                $scope.coachcities = response.data;
                console.log("responsecities",response.data)
                for(var i =0; i<$scope.coachcities.length; i++){
                  $scope.cities.push($scope.coachcities[i].Coach_City)
                }
                console.log("$scope.cities",$scope.cities)
            }, function onFailure() {
               console.log(err)
            });
        }

        $scope.getcities();
        $scope.searchcityobj={};
        $scope.searchcoachlist = [];
        $scope.showcoachlist = [];
        
        $scope.searchcoachfrompage = function(){
            $scope.searchcityobj.Course_STime = $('#datetimepickerstart').find('input').val();
        $scope.searchcityobj.Course_ETime = $('#datetimepickerend').find('input').val();
            
            $scope.coachdetails = [];
           console.log("from dropdown",$scope.searchcityobj)
           $scope.searchcityobj.coursedate =$("#datePickerstart1").find("input").val()
          
            if ($scope.searchcityobj.ville != "" && $scope.searchcityobj.ville != undefined) {
                Coach.searchindetailforcoach($scope.searchcityobj, function onSuccess(response) {
                    $scope.coachdetailsAll = response.coachlist;

                    for (var i = 0; i < $scope.coachdetailsAll.length; i++) 
                     {
                            console.log($scope.coachdetailsAll[i].singlecourse_dbs);
                        
                        for (var j = 0; j < $scope.coachdetailsAll[i].singlecourse_dbs.length; j++) 
                        {
                            moment('2010-10-20').isAfter('2010-10-19');
                           console.log( 'fds',moment('2019-08-01').isAfter('2019-07-31'));
                           console.log($scope.searchcityobj.coursedate);
                           console.log($scope.coachdetailsAll[i].singlecourse_dbs[j].Course_StartDate);

                         console.log(moment($scope.searchcityobj.coursedate).isAfter(moment($scope.coachdetailsAll[i].singlecourse_dbs[j].Course_StartDate))
                         &&moment($scope.searchcityobj.coursedate).isBefore(moment($scope.coachdetailsAll[i].singlecourse_dbs[j].Course_EndDate)))

                         console.log(moment($scope.searchcityobj.coursedate));
                         console.log(moment($scope.coachdetailsAll[i].singlecourse_dbs[j].Course_StartDate))
                           
                            if(moment($scope.searchcityobj.coursedate).isAfter(moment($scope.coachdetailsAll[i].singlecourse_dbs[j].Course_StartDate))
                            &&moment($scope.searchcityobj.coursedate).isBefore(moment($scope.coachdetailsAll[i].singlecourse_dbs[j].Course_EndDate)))
                            {
                               if($scope.coachdetailsAll[i].singlecourse_dbs[j].Course_STime==$scope.searchcityobj.Course_STime
                                && $scope.coachdetailsAll[i].singlecourse_dbs[j].Course_EndDate==$scope.searchcityobj.Course_ETime)
                                {
                                    $scope.coachdetails.push($scope.coachdetailsAll[i])
                                }

                                
                            }
                           
                        }

                       
                      }

                      console.log($scope.coachdetails);
                }, function onFailure() {
                    console.log(err)
                });
            }
            else{
                alert("please choose a city")
            }
        }
})