(function() {
    'use strict';

    angular
        .module('events')
        .controller('EventsController', EventsController);

    EventsController.$inject = ['$scope'];

    /* @ngInject */
    function EventsController($scope) {
        var ctrl = this;

    }
})();
