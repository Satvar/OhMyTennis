var coachServices = angular.module("coach-services", []);
coachServices.factory('Coach', function ($rootScope, $http) {
    var Coach = this;

    // ===================coach==================
    Coach.quickInsertCoach = function (coachConfig,onSuccess, onError) {
           // console.log("coachConfig",coachConfig.Coach_Fname)
        $http.post("/OhMyTennis/quickInsertCoach",coachConfig)
            .then(function onsuccess(res) {
                console.log("res",res)
                var response = res.data;
                if (onSuccess) onSuccess(response);
            }, function onerror(response) {
                console.log("err",response)
                // Help.handleError(response, function () {
                //     if (onError) onError(response);
                // }, response.status);
            });
    }
    
    Coach.coachSignIn = function (coachSign, onSuccess, onError) {
        $http.post("/OhMyTennis/coachSignIn", coachSign)
            .then(function onsuccess(res) {
                console.log("res", res)
                var response = res.data;
                if (onSuccess) onSuccess(response);
            }, function onerror(response) {
                console.log("err", response)
            });
    }
    Coach.detailedInsertCoach = function (coachConfig, onSuccess, onError) {

        console.log("coachConfig", coachConfig);
        var fd = new FormData();

        console.log(coachConfig.coachImageFile);
        console.log(coachConfig.coachResumeFile);
        //return;
        fd.append('Coach_Image', coachConfig.coachImageFile);
        fd.append('Coach_Resume', coachConfig.coachResumeFile);
        fd.append('Coach_Bank_ACCNum', coachConfig.Coach_Bank_ACCNum);
        fd.append('Coach_Bank_Name', coachConfig.Coach_Bank_Name);
        fd.append('Branch_Code', coachConfig.Branch_Code);
        fd.append('Coach_Services', coachConfig.Coach_Services);
        fd.append('Active_City', coachConfig.Active_City);
        fd.append('Coach_Price', coachConfig.Coach_Price);
        fd.append('Coach_transport', coachConfig.Coach_transport);
        fd.append('Coach_payment_type', coachConfig.Coach_payment_type);
        fd.append('Coach_Aviailability', coachConfig.Coach_Aviailability);
        fd.append('Coach_Email', coachConfig.Coach_Email);
        fd.append('Coach_Description', coachConfig.Coach_Description);
        fd.append('Coach_PriceX10', coachConfig.Coach_PriceX10);
        fd.append('Availability_StartDate', coachConfig.Availability_StartDate);
        fd.append('Availability_EndDate', coachConfig.Availability_EndDate);

        $http.post("/OhMyTennis/detailedInsertCoach", fd, {
            withCredentials: false,
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        })
            .then(function onsuccess(res) {



                console.log("res", res)
                var response = res.data;
                if (onSuccess) onSuccess(response);
            }, function onerror(response) {
                console.log("err", response)
            });

    }

    // ==============user==================

Coach.quickInsertUser = function (UserConfig, onSuccess, onError) {
    $http.post("/OhMyTennis/quickInsertUser", UserConfig)
        .then(function onsuccess(res) {
            console.log("res", res)
            var response = res.data;
            if (onSuccess) onSuccess(response);
        }, function onerror(response) {
            console.log("err", response)
        });
}

Coach.userSignIn = function (UserConfig, onSuccess, onError) {
    $http.post("/OhMyTennis/userSignIn", UserConfig)
        .then(function onsuccess(res) {
            console.log("res", res)
            var response = res.data;
            if (onSuccess) onSuccess(response);
        }, function onerror(response) {
            console.log("err", response)
        });
}


 Coach.detailedInsertUser = function (featureConfig, success, failure) {
     console.log("featureConfig",featureConfig)
    var userformdata = new FormData(); 
    userformdata.append('User_profileimage', featureConfig.User_profileimage);
    userformdata.append('User_FirstName', featureConfig.User_FirstName);
    userformdata.append('User_Email', featureConfig.User_Email);
    // userformdata.append('EndDate', featureConfig.EndDate);
    // userformdata.append('ThumbAssetId', featureConfig.ThumbAssetId);
    // userformdata.append('Id', featureConfig.Id);
   
    $http.post("/OhMyTennis/detailedInsertUser", userformdata, {
        withCredentials: false,
        headers: {
            'Content-Type': undefined
        },
        transformRequest: angular.identity
    })
      .then(function onSuccess(response) {
          success(response);
      }, function onError(response) {
        console.log("err",response)
      });
}

Coach.downloadresume = function ( resume,onSuccess, onError) {
    $http.post("/OhMyTennis/downloadresume",resume,{ responseType: 'arraybuffer' })
        .then(function onsuccess(res) {
            console.log("res", res)
            var response = res.data;
            if (onSuccess) onSuccess(response);
        }, function onerror(response) {
            console.log("err", response)
        });
}



Coach.getallcoaches = function (onSuccess, onError) {
    $http.get("/OhMyTennis/getallcoaches")
        .then(function onsuccess(res) {
            console.log("res", res)
            var response = res.data;
            if (onSuccess) onSuccess(response);
        }, function onerror(response) {
            console.log("err", response)
        });
}

    Coach.getcoachbyid = function (Id, onSuccess, onError) {
        console.log("id", Id)
        $http.post("/OhMyTennis/getcoachbyid", Id)
            .then(function onsuccess(res) {
                console.log("res", res)
                var response = res.data;
                if (onSuccess) onSuccess(response);
            }, function onerror(response) {
                console.log("err", response)
            });
    }


// ==================admin===============

    Coach.getCoachDetails = function (coachConfig, onSuccess, onError) {

        $http.post("/OhMyTennis/getCoachDetails")
            .then(function onsuccess(res) {
                console.log("res", res)
                var response = res.data;
                if (onSuccess) onSuccess(response);
            }, function onerror(response) {
                console.log("err", response)
            });

    }


    Coach.coachVerification = function (verifyObj, onSuccess, onError) {

        console.log('ser', verifyObj);
        $http.post("/OhMyTennis/coachVerification", verifyObj)
            .then(function onsuccess(res) {
                console.log("res", res)
                var response = res.data;
                if (onSuccess) onSuccess(response);
            }, function onerror(response) {
                console.log("err", response)
            });

    }


    Coach.getUserDetails = function (coachConfig, onSuccess, onError) {

        $http.post("/OhMyTennis/getUserDetails")
            .then(function onsuccess(res) {
                console.log("res", res)
                var response = res.data;
                if (onSuccess) onSuccess(response);
            }, function onerror(response) {
                console.log("err", response)
            });

    }



    Coach.userVerification = function (verifyObj, onSuccess, onError) {

        console.log('ser', verifyObj);
        $http.post("/OhMyTennis/userVerification", verifyObj)
            .then(function onsuccess(res) {
                console.log("res", res)
                var response = res.data;
                if (onSuccess) onSuccess(response);
            }, function onerror(response) {
                console.log("err", response)
            });

    }

    Coach.search_for_coach = function (searchObj,onSuccess, onError) {
        $http.post("/OhMyTennis/search_for_coach",searchObj)
            .then(function onsuccess(res) {
                console.log("res", res)
                var response = res.data;
                if (onSuccess) onSuccess(response);
            }, function onerror(response) {
                console.log("err", response)
            });
    }

    Coach.blockCoach = function (blockObj, onSuccess, onError) {

        console.log(blockObj);
        $http.post("/OhMyTennis/blockCoach", blockObj)
            .then(function onsuccess(res) {
                console.log("res", res)
                var response = res.data;
                if (onSuccess) onSuccess(response);
            }, function onerror(response) {
                console.log("err", response)
            });

    }


    Coach.UnBlockCoach = function (blockObj, onSuccess, onError) {

        console.log(blockObj);
        $http.post("/OhMyTennis/UnblockCoach", blockObj)
            .then(function onsuccess(res) {
                console.log("res", res)
                var response = res.data;
                if (onSuccess) onSuccess(response);
            }, function onerror(response) {
                console.log("err", response)
            });

    }


    Coach.deleteCoach = function (deleteObj, onSuccess, onError) {

        console.log(deleteObj);
        $http.post("/OhMyTennis/deleteCoach", deleteObj)
            .then(function onsuccess(res) {
                console.log("res", res)
                var response = res.data;
                if (onSuccess) onSuccess(response);
            }, function onerror(response) {
                console.log("err", response)
            });

    }

    Coach.insertIndividualCourse = function(dataObj, onSuccess, onError){
        console.log("dataObj1", dataObj);
        var fd = new FormData();
        fd.append('Coach_ID', dataObj.Coach_ID);
        fd.append('Course_Type', dataObj.Course_Type);
        fd.append('Course_StartDate', dataObj.Course_StartDate);
        fd.append('Course_EndDate', dataObj.Course_EndDate);
        fd.append('Course_Place', dataObj.Course_Place);
        fd.append('Course_STime', dataObj.Course_STime);
        fd.append('Course_ETime', dataObj.Course_ETime);
        fd.append('Course_Description', dataObj.Course_Description);
        fd.append('Course_Video', dataObj.Course_Video);
        fd.append('Course_Name', dataObj.Course_Name);
        fd.append('Course_Price', dataObj.Course_Price);
        fd.append('Course_Transport', dataObj.Course_Transport);
        fd.append('Course_Provided', dataObj.Course_Provided);
        fd.append('Course_Image', dataObj.Course_Image)
        $http.post("/OhMyTennis/insertIndividualCourse", fd, {
            withCredentials: false,
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        })
            .then(function onsuccess(res) {
                console.log("res", res)
                var response = res.data;
                if (onSuccess) onSuccess(response);
            }, function onerror(response) {
                console.log("err", response)
            });
    }

    Coach.searchindetailforcoach = function (searchObj,onSuccess, onError) {
        $http.post("/OhMyTennis/searchindetailforcoach",searchObj)
            .then(function onsuccess(res) {
                console.log("res", res)
                var response = res.data;
                if (onSuccess) onSuccess(response);
            }, function onerror(response) {
                console.log("err", response)
            });
    }

    Coach.forgotpassword = function (CoachEmail, onSuccess, onError) {
        $http.post("/OhMyTennis/forgotpassword", CoachEmail)
            .then(function onsuccess(res) {
                console.log("res", res)
                var response = res.data;
                if (onSuccess) onSuccess(response);
            }, function onerror(response) {
                console.log("err", response)
            });
    }

    Coach.resetPassword = function (onSuccess, onError) {
        $http.get("/OhMyTennis/CoachLogin/PasswordReset")
            .then(function onsuccess(res) {
                console.log("res", res)
                var response = res.data;
                if (onSuccess) onSuccess(response);
            }, function onerror(response) {
                console.log("err", response)
            });

    }

    Coach.setNewPassword = function (passwordObj,onSuccess, onError) {
        $http.post("/OhMyTennis/setNewPassword",passwordObj)
            .then(function onsuccess(res) {
                console.log("res", res)
                var response = res.data;
                if (onSuccess) onSuccess(response);
            }, function onerror(response) {
                console.log("err", response)
            });

    }


    Coach.blockUser = function (blockObj, onSuccess, onError) {

        $http.post("/OhMyTennis/blockUser", blockObj)
            .then(function onsuccess(res) {
                console.log("res", res)
                var response = res.data;
                if (onSuccess) onSuccess(response);
            }, function onerror(response) {
                console.log("err", response)
            });

    }
        
    Coach.UnBlockUser = function (blockObj, onSuccess, onError) {

        console.log('UNB');
        $http.post("/OhMyTennis/UnblockUser", blockObj)
            .then(function onsuccess(res) {
                console.log("res", res)
                var response = res.data;
                if (onSuccess) onSuccess(response);
            }, function onerror(response) {
                console.log("err", response)
            });

    }
        
    Coach.deleteUser = function (deleteObj, onSuccess, onError) {

        $http.post("/OhMyTennis/deleteUser", deleteObj)
            .then(function onsuccess(res) {
                console.log("res", res)
                var response = res.data;
                if (onSuccess) onSuccess(response);
            }, function onerror(response) {
                console.log("err", response)
            });

    }


    Coach.forgotpasswordUser = function (userEmail, onSuccess, onError) {
        $http.post("/OhMyTennis/forgotpassworduser", userEmail)
            .then(function onsuccess(res) {
                console.log("res", res)
                var response = res.data;
                if (onSuccess) onSuccess(response);
            }, function onerror(response) {
                console.log("err", response)
            });
    }

    Coach.setNewPasswordUser = function (passwordObj,onSuccess, onError) {

        console.log('inserv');
        $http.post("/OhMyTennis/setNewPasswordUser",passwordObj)
            .then(function onsuccess(res) {
                console.log("res", res)
                var response = res.data;
                if (onSuccess) onSuccess(response);
            }, function onerror(response) {
                console.log("err", response)
            });

    }

    return Coach;
});