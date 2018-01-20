(function() {
    'use strict';

    angular
        .module('bookerApp', [
            'ngRoute',
            'firebase',
            'login',
            'dashboard',
            'employees',
            'events',
            'payments',
            'settings',
            'venues'
        ]);
})();
