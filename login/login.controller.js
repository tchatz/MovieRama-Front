(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    function LoginController($location, AuthenticationService, FlashService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.status.code == 1) {
                    AuthenticationService.SetCredentials(response.data.token, response.data.firstName,response.data.lastName,response.data.userId);
                    $location.path('/');
                } else {
                    FlashService.Error(response.status.msg);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();
