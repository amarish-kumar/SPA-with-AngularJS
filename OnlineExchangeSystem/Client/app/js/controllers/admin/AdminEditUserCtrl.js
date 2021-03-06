'use strict';

onlineExchange.controller('AdminEditUserCtrl', ['$scope', '$location', '$routeParams', 'AdminUserResource',
    'userAccountService', 'PublicAdsResource', 'notifier', 'identity', 'pageSize',
    function AdminEditUserCtrl($scope, $location, $routeParams, AdminUserResource, userAccountService,
                               PublicAdsResource, notifier, identity, pageSize) {
        $scope.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        $scope.alltowns = PublicAdsResource.getAllTowns();
        $scope.identity = identity;
        var selectedId = $routeParams.id;
        $scope.user = AdminUserResource.getUser(selectedId);
        $scope.user.isAdmin = false;

        $scope.editUserProfile = function (user, editProfileForm) {
            if (editProfileForm.$valid) {
                AdminUserResource.editUser(user, user.userName)
                    .$promise
                    .then(function () {
                        notifier.success('Edit profile successful!');
                        $scope.editProfileForm.$setPristine();
                        $location.path('/admin/users');
                    });
            } else {
                notifier.error('Name, Email, Phone are required fields!')
            }
        }

        $scope.changeUserPasswords = function (pass, changePasswordForm) {
            if (changePasswordForm.$valid) {
                pass.username = $scope.user.userName;
                AdminUserResource.setPassword(pass)
                    .$promise
                    .then(function () {
                        notifier.success('Change passwords successful!');
                        $scope.changePasswordForm.$setPristine();
                        $location.path('/admin/users');
                    })
            } else {
                notifier.error('All password fields are required!')
            }
        }
    }
])
