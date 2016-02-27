'use strict';

angular.module('aklApp')
    .factory('GameServer', function ($resource, DateUtils) {
        return $resource('/api/gameServers/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });