(function() {
    'use strict';

    angular
        .module('bookerApp', [
            'ngRoute',
            'firebase',
            'directives',
            'dateTimeSandbox',
            'login',
            'dashboard',
            'employees',
            'events',
            'payments',
            'settings',
            'venues'
        ]);
})();
