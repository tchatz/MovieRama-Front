(function () {
    'use strict';

    angular
            .module('app')
            .controller('AddMovieController', AddMovieController);

    AddMovieController.$inject = ['UserService', '$scope','$http', '$location', '$rootScope', 'FlashService'];
    function AddMovieController(UserService, $scope, $http , $location, $rootScope, FlashService) {
        $scope.addMov = [];

        $scope.insertMovie = function () {
            $http.post($rootScope.app.apiUrl+'addMovie', {title: $scope.addMov.title, description: $scope.addMov.description})
                    .success(function (response) {
                        if (response.status.code == 1) {
                            FlashService.Success(response.status.msg, true);
                            $location.path('/');
                        } else {
                            FlashService.Error(response.status.msg);
                           
                        }
                    });
        }
    }

})();
