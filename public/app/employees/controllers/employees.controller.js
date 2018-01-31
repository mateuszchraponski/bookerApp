(function() {
    'use strict';

    angular
        .module('employees')
        .controller('EmployeesController', EmployeesController);

    EmployeesController.$inject = ['$scope', 'EmployeesData'];

    /* @ngInject */
    function EmployeesController($scope, EmployeesData) {
        var ctrl = this;

        $scope.employees = EmployeesData;

        console.log($scope.employees);

        $scope.addEmployee = function(){
            var data = {
                employeeName: $scope.employeeName,
                employeePersonalID: $scope.employeePersonalID
            }

            var baseForBirthDate = $scope.employeePersonalID.toString().substr(0, 6);

            var date = moment(baseForBirthDate, 'YYMMDD').format("DD-MM-YYYY");
            data.birthDate = date;

            $scope.employees.$add(data).then(
                function (response) {
                    //success
                    console.log("Pracownik zapisany!", $scope.employees);

                    $scope.employeeName = undefined;
                    $scope.employeePersonalID = undefined;

                },
                function (error) {
                    //error
                    console.log("Dupa i kamieni kupa :)!");
                }
            );

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
