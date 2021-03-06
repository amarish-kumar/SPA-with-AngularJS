'use strict';

onlineExchange.controller('LoginLogoutCtrl', ['$scope', '$location', 'notifier', 'identity', 'userAccountService',
    function LoginLogoutCtrl($scope, $location, notifier, identity, userAccountService) {
        $scope.identity = identity;

        $scope.login = function (user, loginForm) {
            if (loginForm.$valid) {
                userAccountService.login(user).then(function (success) {
                    if (success) {
                        notifier.success('Successful login!');
                        if (identity.isAdmin()) {
                            $location.path('/admin/ads');
                        } else {
                            $location.path('/');
                        }
                    }
                    else {
                        notifier.error('Username/Password combination is not valid!');
                    }
                });
            }
            else {
                notifier.error('Username and password are required fields!')
            }
        }

        $scope.logout = function () {
            userAccountService.logout().then(function () {
                notifier.success('Successful logout!');
                if ($scope.user) {
                    $scope.user = {};
                }
                //$scope.loginForm.$setPristine();
                $location.path('/');
            })
        }
    }])