(function () {
    'use strict';

    angular
            .module('app')
            .controller('userController', userController);

    userController.$inject = ['$scope', '$location', 'AuthenticationService', 'FlashService'];
    function userController($scope, $location, AuthenticationService, FlashService) {


        $scope.logout = function () {
            AuthenticationService.ClearCredentials();
            $location.path('#/login');
        };

        $scope.getClass = function (path) {
            return ($location.path() === path) ? 'active' : '';
        }
    }

})();
