(function () {
    'use strict';

    angular
            .module('app', ['ngRoute', 'ngCookies','yaru22.angular-timeago'])
            .config(config)
            .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
                .when('/', {
                    controller: 'HomeController',
                    templateUrl: 'home/home.view.html',
                    controllerAs: 'vm'
                })
                .when('/addMovie', {
                    controller: 'AddMovieController',
                    templateUrl: 'addMovie/addMovie.view.html',
                    controllerAs: 'vm'
                })

                .when('/login', {
                    controller: 'LoginController',
                    templateUrl: 'login/login.view.html',
                    controllerAs: 'vm'
                })

                .when('/register', {
                    controller: 'RegisterController',
                    templateUrl: 'register/register.view.html',
                    controllerAs: 'vm'
                })

                .otherwise({redirectTo: '/'});
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
//        .mainMenu = {}
        $rootScope.app = {
            apiUrl: 'http://localhost/MovieRama/'
        }
        
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['deftoken'] = $rootScope.globals.currentUser.token; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
//            console.log($rootScope.globals.currentUser);
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if(!loggedIn){
                 $rootScope.isLoggedIn = false;
            }else{
//                 $rootScope.firstName = 
                 $rootScope.isLoggedIn = true;
            }
            if (restrictedPage && !loggedIn) {
                $rootScope.isLoggedIn = false;
                $location.path('/');
            }
        });
    }

})();