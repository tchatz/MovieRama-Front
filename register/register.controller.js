(function () {
    'use strict';

    angular
            .module('app')
            .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function RegisterController(UserService, $scope, $location, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                    .then(function (response) {
                        if (response.status.code == 1) {
                            FlashService.Success(response.status.msg, true);
                            $location.path('/login');
                        } else {
                            FlashService.Error(response.status.msg);
                            vm.dataLoading = false;
                        }
                    });
        }
    }

})();
