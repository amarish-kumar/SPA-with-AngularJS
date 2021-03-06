'use strict';

onlineExchange.controller('SignUpCtrl', ['$scope', '$location', 'userAccountService', 'PublicAdsResource', 'notifier', 'identity',
    function SignUpCtrl($scope, $location, userAccountService, PublicAdsResource, notifier, identity) {
        $scope.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        $scope.alltowns = PublicAdsResource.getAllTowns();
        $scope.identity = identity;

        $scope.register = function (user, signUpForm) {
            if (signUpForm.$valid) {
                userAccountService.signup(user).then(function (success) {
                    notifier.success('Registration successful!');
                    $location.path('/');
                });
            } else {
                notifier.error('Username, Password, Full Name, Email and ConfirmPassword are required fields!')
            }
        }
    }])

