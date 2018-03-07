(function() {
    'use strict';

    angular
        .module('employees')
        .controller('EmployeeDetailsController', EmployeeDetailsController);

    EmployeeDetailsController.$inject = ['$scope', '$rootScope', 'EmployeesData', 'PositionsData', '$routeParams'];

    /* @ngInject */
    function EmployeeDetailsController($scope, $rootScope, EmployeesData, PositionsData, $routeParams) {
        var ctrl = this;

        $scope.employees = EmployeesData;
        $scope.positions = PositionsData;
        $scope.id = $routeParams.id;

        $scope.currentEmployee = $scope.employees.$getRecord($scope.id);
    }


})();
