'use strict';

onlineExchange.factory('PublicAdsResource', ['$resource', 'baseServiceUrl',
    function ($resource, baseServiceUrl) {

        var PublicAdsResource = $resource(baseServiceUrl + '/api/:id'
            , null, {
                'getAllAds': {
                    method: 'GET', isArray: false,
                    params: {id: 'ads?', pageSize: '@pageSize', startPage: '@startPage'}
                },
                'getFilteredAds': {
                    method: 'GET', isArray: false,
                    params: {
                        id: 'ads?', pageSize: '@pageSize', startPage: '@startPage',
                        townId: '@townId', categoryId: '@categoryId'
                    }
                },
                'getAllCategories': {method: 'GET', params: {id: 'categories'}, isArray: true},
                'getAllTowns': {method: 'GET', params: {id: 'towns'}, isArray: true}
            });

        return {
            getAllAds: function (request) {
                return PublicAdsResource.getAllAds(request);
            },
            getAllCategories: function () {
                return PublicAdsResource.getAllCategories();
            },
            getAllTowns: function () {
                return PublicAdsResource.getAllTowns();
            },
            getFilteredAds: function (request) {
                return PublicAdsResource.getFilteredAds(request);
            }
        }
    }]);
