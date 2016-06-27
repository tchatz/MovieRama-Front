(function () {
    'use strict';

    angular
            .module('app')
            .factory('ApiService', ApiService);

    ApiService.$inject = ['$http','$rootScope'];
    function ApiService($http, $rootScope) {
        var service = {};

        service.GetAllMovies = GetAllMovies;
     service.GetAllMoviesById = GetAllMoviesById;
        return service;

        function GetAllMovies() {
            return $http.get($rootScope.app.apiUrl+'getMovies/').then(handleSuccess, handleError('Error getting all movies'));
        }

        function GetAllMoviesById(id) {
            return $http.get($rootScope.app.apiUrl+'getMovies/'+id).then(handleSuccess, handleError('Error getting all movies'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }
        


        function handleError(error) {
            return function () {
                return {success: false, message: error};
            };
        }
    }

})();
