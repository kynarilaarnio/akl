'use strict';

angular.module('aklApp')
    .controller('NavbarController', function ($rootScope, $scope, $location, $state, Auth, Principal, ENV, $http) {
        $scope.isAuthenticated = Principal.isAuthenticated;
        $scope.$state = $state;
        $scope.inProduction = ENV === 'prod';

        var getAccount = function () {
            Principal.identity().then(function(account) {
                $scope.account = account;

                if ($scope.isAuthenticated() && $scope.account.communityId !== null) {
                    $http.get('api/steam/user/' + $scope.account.communityId).success(function (data) {
                        $scope.steamUser = data;
                    });
                }
            });
        };

        getAccount();

        $rootScope.$on('$stateChangeStart', function () {
            getAccount();
        });

        $scope.logout = function () {
            Auth.logout();
            $state.go('home');
        };
    });
