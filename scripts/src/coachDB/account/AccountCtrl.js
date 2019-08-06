console.log("in cntrl")
var coach = angular.module('coach')
coach.controller('AccountCtrl', function ($scope ,$location,Coach) {
    $scope.getSessionObj={};
    $scope.signUpObj = {};
    $scope.buttonText = 'Modifier';
    $scope.signUpObj.Coach_City = 'Paris'
    $scope.selectedPaymentList=[];
    $scope.selectedTransportList = [];
   
    $scope.addclass = function () {

        $scope.getSessionObj = JSON.parse(sessionStorage.loginDetailObj);
        $scope.signUpObj = $scope.getSessionObj[0];

        if($scope.signUpObj.Coach_payment_type!=null &&  $scope.signUpObj.Coach_transport.split!=null)
        {

            $scope.selectedPaymentList = $scope.signUpObj.Coach_payment_type.split(",");
            $scope.selectedTransportList = $scope.signUpObj.Coach_transport.split(",");
    
            for (var i = 0; i < $scope.selectedPaymentList.length; i++) {
    
                document.getElementById($scope.selectedPaymentList[i]).checked = true;
            }
    
            for (var i = 0; i < $scope.selectedTransportList.length; i++) {
    
                document.getElementById($scope.selectedTransportList[i]).checked = true;
            }

        }
       
    }

    $scope.makeEnable = function(){
       $scope.buttonText = 'Enregistrer';
      $("#myForm :input").prop("disabled", false);
      $("#tenPrice").prop("disabled", true);

    }

    $scope.cancelChanges = function(){
      $scope.buttonText = 'Modifier'
      $("#myForm :input").prop("disabled", true);
      $scope.getSessionObj = JSON.parse(sessionStorage.loginDetailObj);
      $scope.signUpObj = $scope.getSessionObj[0];
    }


   $scope.saveCoach = function () {
      if($scope.buttonText == 'Modifier'){
         $('#myModal_edit').modal('show');
      }
      else if ($scope.buttonText == 'Enregistrer') {

         $scope.signUpObj.coachImageFile = $('#coachImage')[0].files[0];
         $scope.signUpObj.coachResumeFile = $('#coachResume')[0].files[0];

         $scope.signUpObj.Coach_transport = $("input:radio[name=transport]:checked").val()
         $scope.signUpObj.Coach_payment_type = $("input:radio[name=payment]:checked").val()

         $scope.signUpObj.Availability_StartDate = $('#datePickerstart').find('input').val();
         $scope.signUpObj.Availability_EndDate = $('#datePickerend').find('input').val();

         $scope.signUpObj.Coach_PriceX10 = document.getElementById('tenPrice').value;

         console.log($scope.signUpObj);

         var Coach_transport = '';
         var inputElements = document.getElementsByClassName('transport');
         for (var i = 0; inputElements[i]; ++i) {
            if (inputElements[i].checked) {
               Coach_transport += inputElements[i].value + ',';
            }
         }

         var Coach_payment_type = '';
         var inputElements1 = document.getElementsByClassName('payment');
         for (var i = 0; inputElements1[i]; ++i) {
            if (inputElements1[i].checked) {
               Coach_payment_type += inputElements1[i].value + ',';
            }
         }
         $scope.signUpObj.Coach_transport = Coach_transport.slice(0, -1);;
         $scope.signUpObj.Coach_payment_type = Coach_payment_type.slice(0, -1);
         console.log($scope.signUpObj);
         if ($scope.signUpObj.Coach_Email == "" || $scope.signUpObj.Coach_Email == undefined) {
            alert("Please enter coach email")
            return;
         }
         if ($scope.signUpObj.Coach_Fname == "" || $scope.signUpObj.Coach_Fname == undefined) {
            alert("Please enter firstname")
            return;
         }
         if ($scope.signUpObj.Coach_Lname == "" || $scope.signUpObj.Coach_Lname == undefined) {
            alert("Please enter name")
            return;
         }
         if ($scope.signUpObj.Coach_Phone == "" || $scope.signUpObj.Coach_Phone == undefined) {
            alert("Please enter phone")
            return;
         }
         if ($scope.signUpObj.Coach_City == "" || $scope.signUpObj.Coach_City == undefined) {
            alert("Please enter city")
            return;
         }
         if ($scope.signUpObj.Coach_Password == "" || $scope.signUpObj.Coach_Password == undefined) {
            alert("Please enter coach password")
            return;
         }
         if ($scope.signUpObj.Coach_Bank_ACCNum == "" || $scope.signUpObj.Coach_Bank_ACCNum == undefined) {
            alert("Please enter Account Number")
            return;
         }
         if ($scope.signUpObj.Coach_Bank_Name == "" || $scope.signUpObj.Coach_Bank_Name == undefined) {
            alert("Please enter bank name")
            return;
         }
         if ($scope.signUpObj.Branch_Code == "" || $scope.signUpObj.Branch_Code == undefined) {
            alert("Please enter branch code")
            return;
         }
         if ($scope.signUpObj.Coach_Services == "" || $scope.signUpObj.Coach_Services == undefined) {
            alert("Please enter services")
            return;
         }
         if ($scope.signUpObj.Active_City == "" || $scope.signUpObj.Active_City == undefined) {
            alert("Please enter city")
            return;
         }
         if ($scope.signUpObj.Coach_Price == "" || $scope.signUpObj.Coach_Price == undefined) {
            alert("Please enter price")
            return;
         }
         if ($scope.signUpObj.Coach_transport == "" || $scope.signUpObj.Coach_transport == undefined) {
            alert("Please select transport")
            return;
         }
         if ($scope.signUpObj.Coach_payment_type == "" || $scope.signUpObj.Coach_payment_type == undefined) {
            alert("Please select payment")
            return;
         }
         if ($scope.signUpObj.coachImageFile == "" || $scope.signUpObj.coachImageFile == undefined) {
            alert("Please upload profile photo")
            return;
         }
         if ($scope.signUpObj.coachResumeFile == "" || $scope.signUpObj.coachResumeFile == undefined) {
            alert("Please upload resume")
            return;
         }
         if ($scope.signUpObj.Coach_Description == "" || $scope.signUpObj.Coach_Description == undefined) {
            alert("Please enter coach description")
            return;
         }
         Coach.detailedInsertCoach($scope.signUpObj, function onSuccess(response) {
            sessionStorage.setItem('loginDetailObj', JSON.stringify(response.updateCoachList))
            alert(response.msg);
            $scope.addclass();
         }, function onFailure() {
            console.log(err)
         });
      }

   }



    $scope.addclass();

    $scope.downloadresume = function () {
        if($scope.signUpObj.Coach_Resume == null || $scope.signUpObj.Coach_Resume == undefined){
            alert("Please upload a resume to download")
            return;
        }
        Coach.downloadresume($scope.signUpObj, function onSuccess(response) {
            // console.log("$scope.signUpObj",$scope.signUpObj.Coach_Resume)
            // console.log("response",response)
            var a = document.createElement("a");
            document.body.appendChild(a);
            var file = new Blob([response], { type: 'application/pdf' });
            var fileURL = window.URL.createObjectURL(file);
            a.href = fileURL;
            a.download = $scope.signUpObj.Coach_Resume;
            a.click();

        }, function onFailure() {
            console.log(err)
        });
    }

   //  ===================================

   $scope.example14model = [];
    $scope.example14settings = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true
    };
    $scope.example14data = [{
        "label": "Alabama",
            "id": "AL"
    }, {
        "label": "Alaska",
            "id": "AK"
    }, {
        "label": "American Samoa",
            "id": "AS"
    }, {
        "label": "Arizona",
            "id": "AZ"
    }, {
        "label": "Arkansas",
            "id": "AR"
    }, {
        "label": "California",
            "id": "CA"
    }, {
        "label": "Colorado",
            "id": "CO"
    }, {
        "label": "Connecticut",
            "id": "CT"
    }, {
        "label": "Delaware",
            "id": "DE"
    }, {
        "label": "District Of Columbia",
            "id": "DC"
    }, {
        "label": "Federated States Of Micronesia",
            "id": "FM"
    }, {
        "label": "Florida",
            "id": "FL"
    }, {
        "label": "Georgia",
            "id": "GA"
    }, {
        "label": "Guam",
            "id": "GU"
    }, {
        "label": "Hawaii",
            "id": "HI"
    }, {
        "label": "Idaho",
            "id": "ID"
    }, {
        "label": "Illinois",
            "id": "IL"
    }, {
        "label": "Indiana",
            "id": "IN"
    }, {
        "label": "Iowa",
            "id": "IA"
    }, {
        "label": "Kansas",
            "id": "KS"
    }, {
        "label": "Kentucky",
            "id": "KY"
    }, {
        "label": "Louisiana",
            "id": "LA"
    }, {
        "label": "Maine",
            "id": "ME"
    }, {
        "label": "Marshall Islands",
            "id": "MH"
    }, {
        "label": "Maryland",
            "id": "MD"
    }, {
        "label": "Massachusetts",
            "id": "MA"
    }, {
        "label": "Michigan",
            "id": "MI"
    }, {
        "label": "Minnesota",
            "id": "MN"
    }, {
        "label": "Mississippi",
            "id": "MS"
    }, {
        "label": "Missouri",
            "id": "MO"
    }, {
        "label": "Montana",
            "id": "MT"
    }, {
        "label": "Nebraska",
            "id": "NE"
    }, {
        "label": "Nevada",
            "id": "NV"
    }, {
        "label": "New Hampshire",
            "id": "NH"
    }, {
        "label": "New Jersey",
            "id": "NJ"
    }, {
        "label": "New Mexico",
            "id": "NM"
    }, {
        "label": "New York",
            "id": "NY"
    }, {
        "label": "North Carolina",
            "id": "NC"
    }, {
        "label": "North Dakota",
            "id": "ND"
    }, {
        "label": "Northern Mariana Islands",
            "id": "MP"
    },
    {
        "label": "Rhode Island",
            "id": "RI"
    }, {
        "label": "South Carolina",
            "id": "SC"
    }, {
        "label": "South Dakota",
            "id": "SD"
    }, {
        "label": "Tennessee",
            "id": "TN"
    }, {
        "label": "Texas",
            "id": "TX"
    }, {
        "label": "Utah",
            "id": "UT"
    }, 
     {
        "label": "Washington",
            "id": "WA"
    }, {
        "label": "West Virginia",
            "id": "WV"
    }, {
        "label": "Wisconsin",
            "id": "WI"
    }, {
        "label": "Wyoming",
            "id": "WY"
    }];
    $scope.example2settings = {
        displayProp: 'id'
    };


    $scope.deleteResume = function(){
        $scope.signUpObj.Coach_Resume=null;
        alert('CV deleted successfully')
      }


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
 
//   ====================

coach.directive('ngDropdownMultiselect', ['$filter', '$document', '$compile', '$parse',

function ($filter, $document, $compile, $parse) {

    return {
        restrict: 'AE',
        scope: {
            selectedModel: '=',
            options: '=',
            extraSettings: '=',
            events: '=',
            searchFilter: '=?',
            translationTexts: '=',
            groupBy: '@'
        },
        template: function (element, attrs) {
            var checkboxes = attrs.checkboxes ? true : false;
            var groups = attrs.groupBy ? true : false;

            var template = '<div class="multiselect-parent btn-group dropdown-multiselect">';
            template += '<button type="button" class="dropdown-toggle" ng-class="settings.buttonClasses" ng-click="toggleDropdown()">{{getButtonText()}}&nbsp;<span class="caret"></span></button>';
            template += '<ul class="dropdown-menu dropdown-menu-form" ng-style="{display: open ? \'block\' : \'none\', height : settings.scrollable ? settings.scrollableHeight : \'auto\' }" style="overflow: scroll" >';
            template += '<li ng-hide="!settings.showCheckAll || settings.selectionLimit > 0"><a data-ng-click="selectAll()"><span class="glyphicon glyphicon-ok"></span>  {{texts.checkAll}}</a>';
            template += '<li ng-show="settings.showUncheckAll"><a data-ng-click="deselectAll();"><span class="glyphicon glyphicon-remove"></span>   {{texts.uncheckAll}}</a></li>';
            template += '<li ng-hide="(!settings.showCheckAll || settings.selectionLimit > 0) && !settings.showUncheckAll" class="divider"></li>';
            template += '<li ng-show="settings.enableSearch"><div class="dropdown-header"><input type="text" class="form-control" style="width: 100%;" ng-model="searchFilter" placeholder="{{texts.searchPlaceholder}}" /></li>';
            template += '<li ng-show="settings.enableSearch" class="divider"></li>';

            if (groups) {
                template += '<li ng-repeat-start="option in orderedItems | filter: searchFilter" ng-show="getPropertyForObject(option, settings.groupBy) !== getPropertyForObject(orderedItems[$index - 1], settings.groupBy)" role="presentation" class="dropdown-header">{{ getGroupTitle(getPropertyForObject(option, settings.groupBy)) }}</li>';
                template += '<li ng-repeat-end role="presentation">';
            } else {
                template += '<li role="presentation" ng-repeat="option in options | filter: searchFilter">';
            }

            template += '<a role="menuitem" tabindex="-1" ng-click="setSelectedItem(getPropertyForObject(option,settings.idProp))">';

            if (checkboxes) {
                template += '<div class="checkbox"><label><input class="checkboxInput" type="checkbox" ng-click="checkboxClick($event, getPropertyForObject(option,settings.idProp))" ng-checked="isChecked(getPropertyForObject(option,settings.idProp))" /> {{getPropertyForObject(option, settings.displayProp)}}</label></div></a>';
            } else {
                template += '<span data-ng-class="{\'glyphicon glyphicon-ok\': isChecked(getPropertyForObject(option,settings.idProp))}"></span> {{getPropertyForObject(option, settings.displayProp)}}</a>';
            }

            template += '</li>';

            template += '<li class="divider" ng-show="settings.selectionLimit > 1"></li>';
            template += '<li role="presentation" ng-show="settings.selectionLimit > 1"><a role="menuitem">{{selectedModel.length}} {{texts.selectionOf}} {{settings.selectionLimit}} {{texts.selectionCount}}</a></li>';

            template += '</ul>';
            template += '</div>';

            element.html(template);
        },
        link: function ($scope, $element, $attrs) {
            var $dropdownTrigger = $element.children()[0];

            $scope.toggleDropdown = function () {
                $scope.open = !$scope.open;
            };

            $scope.checkboxClick = function ($event, id) {
                $scope.setSelectedItem(id);
                $event.stopImmediatePropagation();
            };

            $scope.externalEvents = {
                onItemSelect: angular.noop,
                onItemDeselect: angular.noop,
                onSelectAll: angular.noop,
                onDeselectAll: angular.noop,
                onInitDone: angular.noop,
                onMaxSelectionReached: angular.noop
            };

            $scope.settings = {
                dynamicTitle: true,
                scrollable: false,
                scrollableHeight: '300px',
                closeOnBlur: true,
                displayProp: 'label',
                idProp: 'id',
                externalIdProp: 'id',
                enableSearch: false,
                selectionLimit: 0,
                showCheckAll: true,
                showUncheckAll: true,
                closeOnSelect: false,
                buttonClasses: 'btn btn-default',
                closeOnDeselect: false,
                groupBy: $attrs.groupBy || undefined,
                groupByTextProvider: null,
                smartButtonMaxItems: 0,
                smartButtonTextConverter: angular.noop
            };

            $scope.texts = {
                checkAll: 'Check All',
                uncheckAll: 'Uncheck All',
                selectionCount: 'checked',
                selectionOf: '/',
                searchPlaceholder: 'Search...',
                buttonDefaultText: 'Select',
                dynamicButtonTextSuffix: 'checked'
            };

            $scope.searchFilter = $scope.searchFilter || '';

            if (angular.isDefined($scope.settings.groupBy)) {
                $scope.$watch('options', function (newValue) {
                    if (angular.isDefined(newValue)) {
                        $scope.orderedItems = $filter('orderBy')(newValue, $scope.settings.groupBy);
                    }
                });
            }

            angular.extend($scope.settings, $scope.extraSettings || []);
            angular.extend($scope.externalEvents, $scope.events || []);
            angular.extend($scope.texts, $scope.translationTexts);

            $scope.singleSelection = $scope.settings.selectionLimit === 1;

            function getFindObj(id) {
                var findObj = {};

                if ($scope.settings.externalIdProp === '') {
                    findObj[$scope.settings.idProp] = id;
                } else {
                    findObj[$scope.settings.externalIdProp] = id;
                }

                return findObj;
            }

            function clearObject(object) {
                for (var prop in object) {
                    delete object[prop];
                }
            }

            if ($scope.singleSelection) {
                if (angular.isArray($scope.selectedModel) && $scope.selectedModel.length === 0) {
                    clearObject($scope.selectedModel);
                }
            }

            if ($scope.settings.closeOnBlur) {
                $document.on('click', function (e) {
                    var target = e.target.parentElement;
                    var parentFound = false;

                    while (angular.isDefined(target) && target !== null && !parentFound) {
                        if (_.contains(target.className.split(' '), 'multiselect-parent') && !parentFound) {
                            if (target === $dropdownTrigger) {
                                parentFound = true;
                            }
                        }
                        target = target.parentElement;
                    }

                    if (!parentFound) {
                        $scope.$apply(function () {
                            $scope.open = false;
                        });
                    }
                });
            }

            $scope.getGroupTitle = function (groupValue) {
                if ($scope.settings.groupByTextProvider !== null) {
                    return $scope.settings.groupByTextProvider(groupValue);
                }

                return groupValue;
            };

            $scope.getButtonText = function () {
                if ($scope.settings.dynamicTitle && ($scope.selectedModel.length > 0 || (angular.isObject($scope.selectedModel) && _.keys($scope.selectedModel).length > 0))) {
                    if ($scope.settings.smartButtonMaxItems > 0) {
                        var itemsText = [];

                        angular.forEach($scope.options, function (optionItem) {
                            if ($scope.isChecked($scope.getPropertyForObject(optionItem, $scope.settings.idProp))) {
                                var displayText = $scope.getPropertyForObject(optionItem, $scope.settings.displayProp);
                                var converterResponse = $scope.settings.smartButtonTextConverter(displayText, optionItem);

                                itemsText.push(converterResponse ? converterResponse : displayText);
                            }
                        });

                        if ($scope.selectedModel.length > $scope.settings.smartButtonMaxItems) {
                            itemsText = itemsText.slice(0, $scope.settings.smartButtonMaxItems);
                            itemsText.push('...');
                        }

                        return itemsText.join(', ');
                    } else {
                        var totalSelected;

                        if ($scope.singleSelection) {
                            totalSelected = ($scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp])) ? 1 : 0;
                        } else {
                            totalSelected = angular.isDefined($scope.selectedModel) ? $scope.selectedModel.length : 0;
                        }

                        if (totalSelected === 0) {
                            return $scope.texts.buttonDefaultText;
                        } else {
                            return totalSelected + ' ' + $scope.texts.dynamicButtonTextSuffix;
                        }
                    }
                } else {
                    return $scope.texts.buttonDefaultText;
                }
            };

            $scope.getPropertyForObject = function (object, property) {
                if (angular.isDefined(object) && object.hasOwnProperty(property)) {
                    return object[property];
                }

                return '';
            };

            $scope.selectAll = function () {
                $scope.deselectAll(false);
                $scope.externalEvents.onSelectAll();

                angular.forEach($scope.options, function (value) {
                    $scope.setSelectedItem(value[$scope.settings.idProp], true);
                });
            };

            $scope.deselectAll = function (sendEvent) {
                sendEvent = sendEvent || true;

                if (sendEvent) {
                    $scope.externalEvents.onDeselectAll();
                }

                if ($scope.singleSelection) {
                    clearObject($scope.selectedModel);
                } else {
                    $scope.selectedModel.splice(0, $scope.selectedModel.length);
                }
            };

            $scope.setSelectedItem = function (id, dontRemove) {
                var findObj = getFindObj(id);
                var finalObj = null;

                if ($scope.settings.externalIdProp === '') {
                    finalObj = _.find($scope.options, findObj);
                } else {
                    finalObj = findObj;
                }

                if ($scope.singleSelection) {
                    clearObject($scope.selectedModel);
                    angular.extend($scope.selectedModel, finalObj);
                    $scope.externalEvents.onItemSelect(finalObj);
                    if ($scope.settings.closeOnSelect) $scope.open = false;

                    return;
                }

                dontRemove = dontRemove || false;

                var exists = _.findIndex($scope.selectedModel, findObj) !== -1;

                if (!dontRemove && exists) {
                    $scope.selectedModel.splice(_.findIndex($scope.selectedModel, findObj), 1);
                    $scope.externalEvents.onItemDeselect(findObj);
                } else if (!exists && ($scope.settings.selectionLimit === 0 || $scope.selectedModel.length < $scope.settings.selectionLimit)) {
                    $scope.selectedModel.push(finalObj);
                    $scope.externalEvents.onItemSelect(finalObj);
                }
                if ($scope.settings.closeOnSelect) $scope.open = false;
            };

            $scope.isChecked = function (id) {
                if ($scope.singleSelection) {
                    return $scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp]) && $scope.selectedModel[$scope.settings.idProp] === getFindObj(id)[$scope.settings.idProp];
                }

                return _.findIndex($scope.selectedModel, getFindObj(id)) !== -1;
            };

            $scope.externalEvents.onInitDone();
        }
    };
}]);