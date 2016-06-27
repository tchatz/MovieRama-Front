(function () {
    'use strict';

    angular
            .module('app')
            .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$http', '$location', 'ApiService', '$rootScope', '$cookieStore'];
    function HomeController($scope, $http, $location, ApiService, $rootScope, $cookieStore) {
        $scope.$location = $location;
        $scope.SelectedUser = '';


        $scope.loadMovies = function () {
            ApiService.GetAllMovies()
                    .then(function (movies) {
                        if (movies.status.code == '3') {
                            alert("s");
                            $http.defaults.headers.common['deftoken'] = movies.status.newToken;
                            $rootScope.globals.currentUser.token = movies.status.newToken;
                            $cookieStore.put('globals', $rootScope.globals);
                            $scope.loadMovies();
                        } else {
                            $scope.UserMovies = false;
                            $scope.movies = movies.data;
                            console.log($scope.movies);
                        }
                    });
        }


        $scope.loadMoviesById = function (id) {
            ApiService.GetAllMoviesById(id)
                    .then(function (movies) {
                        if (movies.status.code == '3') {
                            $http.defaults.headers.common['deftoken'] = movies.status.newToken;
                            $rootScope.globals.currentUser.token = movies.status.newToken;
                            $cookieStore.put('globals', $rootScope.globals);
                            $scope.loadMoviesById(id);
                        } else {
                            $scope.UserMovies = true;
                            $scope.SelectedUser = id;
                            $scope.movies = movies.data;
                            console.log($scope.movies);
                        }
                    });
        }


        $scope.loadMovies();

        $scope.giveVote = function (vote, movieId) {
            $http.post($rootScope.app.apiUrl + 'voteMovie', {vote: vote, movie: movieId})
                    .success(function (response) {
                        if (response.status.code == '3') {
                            $http.defaults.headers.common['deftoken'] = response.status.newToken;
                            $rootScope.globals.currentUser.token = movies.status.newToken;
                            $cookieStore.put('globals', $rootScope.globals);
                            $scope.giveVote(vote, movieId);
                        } else {
                            console.log(response);
                            if ($scope.UserMovies) {
                                $scope.loadMoviesById($scope.SelectedUser);
                            } else {
                                $scope.loadMovies();
                            }
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