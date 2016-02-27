'use strict';

angular.module('aklApp').controller('TeamDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Team', 'User',
        function($scope, $stateParams, $uibModalInstance, entity, Team, User) {

        $scope.team = entity;
        $scope.users = User.query();
        $scope.load = function(id) {
            Team.get({id : id}, function(result) {
                $scope.team = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('aklApp:teamUpdate', result);
            $uibModalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.team.id != null) {
                Team.update($scope.team, onSaveFinished);
            } else {
                Team.save($scope.team, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);