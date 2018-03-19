(function() {
    'use strict';

    angular
        .module('directives')
        .directive('eventStaffList', eventStaffList);

    /* @ngInject */
    function eventStaffList() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/common/directives/modals/event-staff-list/event-staff-list.directive.html',
            scope: {
            },
            link: linkFunc,
            controller: EventStaffListController,
            controllerAs: 'eventStaffListCtrl',
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

    EventStaffListController.$inject = ['$scope', '$rootScope', 'DataService'];

    /* @ngInject */
    function EventStaffListController($scope, $rootScope, DataService) {
        var ctrl = this;

        $rootScope.$on('openEventStaffListModal', function(e, ev){
            ctrl.showModal();
            $scope.event = ev;
			calculateBookings();
        });

		function calculateBookings(){
			DataService.getEmployees().then(
                function(data){
                    $scope.employees = data;
                }
            );

			DataService.getPositions().then(
                function(data){
                    $scope.positions = data;
                }
            );

			DataService.getBookings().then(function(data){
				$scope.bookings = data;

				angular.forEach($scope.bookings, function(booking){
					if(booking.eventId == $scope.event.$id){
						booking.employeeName = $scope.employees.$getRecord(booking.employeeId).employeeName;
						booking.positionName = $scope.positions.$getRecord(booking.positionId).name;
					}
				})

			})

		}

		function deleteBooking(booking){
			$scope.bookings.$remove(booking).then(
				function(resp){
					console.log('deleted');
					calculateBookings();
				}
			)
		}

		$scope.unbook = function(booking) {
			console.log('unbook');
			deleteBooking(booking);
		}


    }
})();
