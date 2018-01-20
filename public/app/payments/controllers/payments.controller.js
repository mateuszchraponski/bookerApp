(function() {
    'use strict';

    angular
        .module('payments')
        .controller('PaymentsController', PaymentsController);

    PaymentsController.$inject = ['$scope'];

    /* @ngInject */
    function PaymentsController($scope) {
        var ctrl = this;

    }
})();
