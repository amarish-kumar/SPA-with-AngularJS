'use strict';

var onlineExchange = angular.module('onlineExchange', ['ngRoute', 'ngResource', 'ngCookies', 'angularFileUpload']).
    config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $httpProvider.interceptors.push('errorHandlerHttpInterceptor');

        var routeUserChecks = {
            authenticated: {
                authenticate: function (auth) {
                    return auth.isAuthenticated();
                }
            }
        };

        $routeProvider
            .when('/', {
                templateUrl: 'views/partials/home.html',
                controller: 'HomeCtrl'
            })
            .when('/register', {
                templateUrl: 'views/partials/user-register.html',
                controller: 'SignUpCtrl'
            })
            .when('/login', {
                templateUrl: 'views/partials/user-login.html',
                controller: 'LoginLogoutCtrl'
            })
            .when('#/user/ads/publish', {
                templateUrl: 'views/partials/user-publish-add.html',
                controller: 'UserCtrl',
                resolve: routeUserChecks.authenticated
            })
            .otherwise({redirectTo: '/'});
    }])
    .run(function ($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            if (rejection === 'not authorized') {
                $location.path('/');
            }
        })
    })
    .value('toastr', toastr)
    .constant('baseServiceUrl', 'http://softuni-ads.azurewebsites.net');

//nstant('baseServiceUrl', 'http://localhost:1337');