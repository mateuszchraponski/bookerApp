(function() {
    'use strict';

    angular
        .module('employees')
        .controller('EmployeesController', EmployeesController);

    EmployeesController.$inject = ['$scope'];

    /* @ngInject */
    function EmployeesController($scope) {
        var ctrl = this;

    }
})();
