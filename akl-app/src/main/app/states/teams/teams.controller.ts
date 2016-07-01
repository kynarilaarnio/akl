angular.module('app')
.controller('TeamsController', ($scope, teams, $state, $stateParams, Principal, Team) => {
    $scope.isAuthenticated = Principal.isAuthenticated;
    $scope.teams = <any> teams.data;

    $scope.pages = teams.headers('X-Total-Count');
    $scope.currentPage = $stateParams.page;

    $scope.pageChanged = () => {
        $state.transitionTo($state.current, {
            page: $scope.currentPage
        });
    };

    if ($scope.isAuthenticated()) {
        Principal.identity(true).then(account => {
            $scope.account = account;
            return Principal.isInRole('ROLE_ADMIN');
        }).then(result => {
            $scope.isAdmin = result;
        });
    }

    $scope.canCreateTeam = () => {
        return $scope.account && $scope.account.email && $scope.account.activated;
    };

    $scope.hasPermissions = team => {
        return $scope.isAdmin;
    };

    $scope.isInactive = team => {
        return $scope.isAdmin && !team.activated;
    };

    $scope.activate = id => {
        Team.activate({id: id}, result => {
            _.find($scope.teams, {
                id: id
            }).activated = true;
            $scope.clear();
        });
    };

    $scope.delete = id => {
        Team.get({id: id}, result => {
            $scope.team = result;
            $('#deleteTeamConfirmation').modal('show');
        });
    };

    $scope.confirmDelete = id => {
        Team.delete({id: id}, () => {
                _.remove($scope.teams, {
                    id: id
                });
                $('#deleteTeamConfirmation').modal('hide');
                $scope.clear();
            });
    };

    $scope.clear = () => {
        $scope.team = {};
    };
});