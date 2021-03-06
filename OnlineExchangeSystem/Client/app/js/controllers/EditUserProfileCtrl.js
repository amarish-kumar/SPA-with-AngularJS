'use strict';

onlineExchange.controller('EditUserProfileCtrl', ['$scope', 'userAccountService', 'PublicAdsResource', 'notifier',
    'identity', '$location',
    function EditUserProfileCtrl($scope, userAccountService, PublicAdsResource, notifier, identity, $location) {
        $scope.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        $scope.alltowns = PublicAdsResource.getAllTowns();
        $scope.identity = identity;

        $scope.userData = (function () {
            userAccountService.userInfo()
                .then(function (response) {
                    $scope.user = response;
                });
        }());


        $scope.editUserProfile = function (user, editProfileForm) {
            if (editProfileForm.$valid) {
                userAccountService.editProfile(user)
                    .then(function (success) {
                        if (success) {
                            notifier.success('Edit profile successful!');
                            $scope.editProfileForm.$setPristine();
                            $location.path('/user/ads');
                        } else {
                            notifier.error('Edit profile due error!');
                        }
                    });
            } else {
                notifier.error('Name, Email, Phone are required fields!')
            }
        }

        $scope.changeUserPasswords = function (pass, changePasswordForm) {
            if (changePasswordForm.$valid) {
                userAccountService.changePassword(pass)
                    .then(function (success) {
                        if (success) {
                            notifier.success('Change passwords successful!');
                            $scope.changePasswordForm.$setPristine();
                            $location.path('/user/ads');
                        } else {
                            notifier.error('Change password due error!');
                        }
                    })
            } else {
                notifier.error('All password fields are required!')
            }
        }
    }
])