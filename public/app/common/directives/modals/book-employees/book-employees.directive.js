(function() {
    'use strict';

    angular
        .module('directives')
        .directive('bookEmployees', bookEmployees);

    /* @ngInject */
    function bookEmployees() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/common/directives/modals/book-employees/book-employees.directive.html',
            scope: {
            },
            link: linkFunc,
            controller: BookEmployeesController,
            controllerAs: 'bookEmployeesCtrl',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            ctrl.showModal = function(){
                el.modal("show");
            }

            ctrl.hideModal = function(){
                el.modal("hide");
            }
        }
    }

    BookEmployeesController.$inject = ['$scope', '$rootScope', 'DataService'];

    /* @ngInject */
    function BookEmployeesController($scope, $rootScope, DataService) {
        var ctrl = this;

        $rootScope.$on('openBookEmployeesModal', function(e, ev){
            ctrl.showModal();

            $scope.event = ev;

			console.log($scope.event);
			calculateBookings();
        });

		function calculateBookings(){
			DataService.getEmployees().then(
                function(data){
                    $scope.employees = data;
                }
            );

			DataService.getBookings().then(function(data){
				$scope.bookings = data;

				angular.forEach($scope.bookings, function(booking){
					if(booking.eventId == $scope.event.$id){
						var employee = $scope.employees.$getRecord(booking.employeeId);
						employee.alreadyBooked = true;
						employee.bookedOn = booking.positionId;
					}
				})

				angular.forEach($scope.event.eventNeeds, function(need){
					need.bookedEmployees = 0;
					angular.forEach($scope.bookings, function(booking){
						if(booking.eventId == $scope.event.$id && booking.positionId == need.position){
							need.bookedEmployees += 1;
						}
					})
				})
			})

		}

		$scope.bookEmployee = function(need, employee){
			console.log(need, employee, $scope.event);

			var bookingData = {
				eventId: $scope.event.$id,
				employeeId: employee.$id,
				positionId: need.position
			}

			console.log(bookingData);

			$scope.bookings.$add(bookingData).then(
				function(){
					console.log('added');

					calculateBookings();
				}
			)

		}

		function deleteBooking(booking){
			$scope.bookings.$remove(booking).then(
				function(resp){
					console.log('deleted');
					calculateBookings();
				}
			)
		}

		$scope.unbook = function(need, employee) {
			console.log('unbook');
			angular.forEach($scope.bookings, function(booking){
				if(booking.eventId == $scope.event.$id && booking.employeeId == employee.$id && booking.positionId == need.position){
					deleteBooking(booking);
				}
			})
		}


    }
})();
