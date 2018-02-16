(function() {
    'use strict';

    angular
        .module('employees')
        .controller('EmployeesController', EmployeesController);

    EmployeesController.$inject = ['$scope', '$rootScope', 'EmployeesData', 'PositionsData'];

    /* @ngInject */
    function EmployeesController($scope, $rootScope, EmployeesData, PositionsData) {
        var ctrl = this;

        $scope.employees = EmployeesData;
        $scope.positions = PositionsData;

        $scope.openAddEmployeeModal = function(){
            console.log('open');
            $rootScope.$broadcast('openAddEmployeeModal');
        }

        $scope.deleteEmployee = function(item){
            $scope.employees.$remove(item).then(
                function (response) {
                    //success
                    console.log("Pracownik usunięty!", $scope.employees);
                },
                function (error) {
                    //error
                    console.log("Dupa i kamieni kupa :)!");
                }
            );
        }
    }
})();
