(function () {
    'use strict';

    angular
            .module('app')
            .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$http', '$location', 'ApiService', '$rootScope'];
    function HomeController($scope, $http, $location, ApiService, $rootScope) {
         $scope.$location = $location;
        $scope.SelectedUser = '';


        $scope.loadMovies = function () {
            ApiService.GetAllMovies()
                    .then(function (movies) {
                        $scope.UserMovies = false;
                        $scope.movies = movies.data;
                        console.log($scope.movies);
                    });
        }


        $scope.loadMoviesById = function (id) {
            ApiService.GetAllMoviesById(id)
                    .then(function (movies) {
                        $scope.UserMovies = true;
                        $scope.SelectedUser = id;
                        $scope.movies = movies.data;
                        console.log($scope.movies);
                    });
        }


        $scope.loadMovies();

        $scope.giveVote = function (vote, movieId) {
            $http.post($rootScope.app.apiUrl+'voteMovie', {vote: vote, movie: movieId})
                    .success(function (response) {
                        console.log(response);
                        if ($scope.UserMovies) {
                            $scope.loadMoviesById($scope.SelectedUser);
                        } else {
                            $scope.loadMovies();
                        }
                    });
        }

        $scope.propertyName = 'published';
        $scope.reverse = true;

        $scope.sortBy = function (propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };
    }

})();