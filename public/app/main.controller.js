(function() {
    'use strict';

    angular
        .module('bookerApp')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$route', '$window', '$rootScope', '$location', 'AuthService'];

    /* @ngInject */
    function MainController($scope, $route, $window, $rootScope, $location, AuthService) {
        var ctrl = this;

        // watch on link changed
        $rootScope.$on('$routeChangeSuccess', function () {
            // get link
            $scope.currPath = $location.path();
            // if user logged in and is now on login or register path and not in dashboard script redirect to dashboard
            if($scope.isAuth && ($scope.currPath == '/login' || $scope.currPath == '/register') && $scope.currPath != '/dashboard') {
                $location.path('/dashboard');
            }
        });

        // login event listener - when user logged in script turn on secured site or login as non secured
        AuthService.auth().$onAuthStateChanged(function(firebaseUser) {
            if (firebaseUser) {
                // login success
                $scope.firebaseUser = firebaseUser;
                $rootScope.firebaseUser = firebaseUser;

                // auto redirect to dashboard
                if($scope.currPath == '/login' || $scope.currPath == '/register') {
                    $location.path('/dashboard');
                }

                $window.openFirebaseConnections = [];
                $scope.isAuth = true;
            } else {
                // login failed or logout
                $scope.isAuth = false;
                window.location.href = '#/login';
                delete $window.openFirebaseConnections;
            }
        });

		$scope.menu = [
			// {
			// 	link: '/dashboard',
			// 	label: 'Dashboard'
			// },
			{
				link: '/employees',
				label: 'Pracownicy'
			},
			{
				link: '/events',
				label: 'Wydarzenia'
			},
			{
				link: '/venues',
				label: 'Lokalizacje'
			},
			{
				link: '/payments',
				label: 'Płatności'
			},
			{
				link: '/settings',
				label: 'Ustawienia'
			}
		];

		$scope.setMenuItemActive = function(item){
			console.log($location.path());
			if (!item) {
				var item = {
					link: $location.path()
				}
			}

			var active = _.find($scope.menu, ['active', true]);
			if (active) {
				active.active = false;
			}

			var setActive = _.find($scope.menu, ['link', item.link]);
			if (setActive) {
				setActive.active = true;
			}
		}

		$scope.setMenuItemActive();


        // logout event
        $scope.logout = function(){
            // destroy all firebase refs
            angular.forEach($window.openFirebaseConnections, function (item) {
                item.$destroy();
            });

            AuthService.auth().$signOut();
        }
    }
})();
