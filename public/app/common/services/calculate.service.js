(function() {
    'use strict';

    angular
        .module('bookerApp')
        .service('calculateService', CalculateService);

    CalculateService.$inject = [];

    /* @ngInject */
    function CalculateService() {
        this.calculateContract = function (hours, amount) {
            var pensja = hours* amount;
            return pensja;
        }
    }
})();
