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
                            //return $firebaseAuth().$requireSignIn();
                            return $firebaseAuth().$waitForSignIn();
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
