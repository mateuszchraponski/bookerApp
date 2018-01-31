(function() {
    'use strict';

    angular
        .module('bookerApp').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

            $routeProvider
            .when(
                '/dashboard',{
                    templateUrl: 'app/dashboard/views/dashboard.view.html',
                    controller: 'DashboardController',
                    resolve: {
                        "CurrentAuth": ["$firebaseAuth", function($firebaseAuth) {
                            return $firebaseAuth().$requireSignIn();
                        }]
                    }
                }
            )
            .when(
                '/employees',{
                    templateUrl: 'app/employees/views/employees.view.html',
                    controller: 'EmployeesController',
                    resolve: {
                        "CurrentAuth": ["$firebaseAuth", function($firebaseAuth) {
                            return $firebaseAuth().$requireSignIn();
                        }],
                        "EmployeesData": ['DataService', function(DataService) {
                            return DataService.getEmployees();
                        }]
                    }
                }
            )
            .when(
                '/events',{
                    templateUrl: 'app/events/views/events.view.html',
                    controller: 'EventsController',
                    resolve: {
                        "CurrentAuth": ["$firebaseAuth", function($firebaseAuth) {
                            return $firebaseAuth().$requireSignIn();
                        }]
                    }
                }
            )
            .when(
                '/payments',{
                    templateUrl: 'app/payments/views/payments.view.html',
                    controller: 'PaymentsController',
                    resolve: {
                        "CurrentAuth": ["$firebaseAuth", function($firebaseAuth) {
                            return $firebaseAuth().$requireSignIn();
                        }]
                    }
                }
            )
            .when(
                '/settings',{
                    templateUrl: 'app/settings/views/settings.view.html',
                    controller: 'SettingsController',
                    resolve: {
                        "CurrentAuth": ["$firebaseAuth", function($firebaseAuth) {
                            return $firebaseAuth().$requireSignIn();
                        }]
                    }
                }
            )
            .when(
                '/venues',{
                    templateUrl: 'app/venues/views/venues.view.html',
                    controller: 'VenuesController',
                    resolve: {
                        "CurrentAuth": ["$firebaseAuth", function($firebaseAuth) {
                            return $firebaseAuth().$requireSignIn();
                        }]
                    }
                }
            )
            .when(
                '/login',{
                    templateUrl: 'app/login/views/login.view.html',
                    controller: 'LoginController',
                    resolve: {
                        "CurrentAuth": ["$firebaseAuth", function($firebaseAuth) {
                            return $firebaseAuth().$waitForSignIn();
                        }]
                    }
                }
            )
            .otherwise({
                redirectTo: '/dashboard'
            });

            $locationProvider.hashPrefix('');
        }])
        .run(["$rootScope", '$window', "$location", function($rootScope, $window, $location) {

            $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
                console.log('error', error);
                if (error === "AUTH_REQUIRED") {
                    $rootScope.logged = false;
                    $location.path("/login");
                }

                if (error === "NOT_ALLOWED") {
                    $location.path("/dashboard");
                }
            });


        }]);
})();
