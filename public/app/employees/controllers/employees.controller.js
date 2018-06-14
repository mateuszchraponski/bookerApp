(function() {
    'use strict';

    angular
        .module('employees')
        .controller('EmployeesController', EmployeesController);

    EmployeesController.$inject = ['$scope', '$rootScope', 'EmployeesData', 'PositionsData', '$location'];

    /* @ngInject */
    function EmployeesController($scope, $rootScope, EmployeesData, PositionsData, $location) {
        var ctrl = this;

        $scope.employees = EmployeesData;
        $scope.positions = PositionsData;

        $scope.openAddEmployeeModal = function(){
            console.log('open');
            $rootScope.$broadcast('openAddEmployeeModal');
        }

        $scope.deleteEmployee = function(item){
			if (!confirm("Czy na pewno usunąć pracownika " + item.employeeName)) {
				return;
			}

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
        $scope.showEmployeeDetails = function(item) {
            $location.path("employees/"+item.$id)
        }
    }
})();
