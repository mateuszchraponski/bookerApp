(function() {
    'use strict';

    angular
        .module('payments')
        .controller('PaymentsController', PaymentsController);

    PaymentsController.$inject = ['$scope', 'BookingsData', 'EventsData', 'EmployeesData', 'PositionsData'];

    /* @ngInject */
    function PaymentsController($scope, BookingsData, EventsData, EmployeesData, PositionsData) {
        var ctrl = this;

        $scope.events = EventsData;
        $scope.bookings = BookingsData;
        $scope.employees = EmployeesData;
        $scope.positions = PositionsData;

        console.log($scope.events);

        refreshBookings();

        function refreshBookings() {
            angular.forEach($scope.bookings, function(booking){
				console.log(booking);
                var event = $scope.events.$getRecord(booking.eventId);
				console.log(event);
                var start = moment(event.eventStartDate);
                var end = moment(event.eventEndDate);
                booking.workHours = end.diff(start, 'hours', true);

                booking.employee = $scope.employees.$getRecord(booking.employeeId);
                booking.employeePosition = $scope.positions.$getRecord(booking.positionId);
                booking.payAmount = booking.workHours * parseFloat(booking.employeePosition.basePrice);
            })

			angular.forEach($scope.events, function(event){
				var eventBookings = _.filter($scope.bookings, function(boo){ return boo.eventId == event.$id});
				event.isAllPaid = _.every(eventBookings, ['isPaid', true]);
			})
        }

        $scope.payForBooking = function(booking){
            booking.isPaid = true;

            $scope.bookings.$save(booking).then(
                function(resp){
                    console.log('zaplacono');
                    refreshBookings();
                }
            )
        }

        $scope.deletePayForBooking = function(booking){
            booking.isPaid = false;

            $scope.bookings.$save(booking).then(
                function(resp){
                    console.log('nie zaplacono');
                    refreshBookings();
                }
            )
        }
    }
})();
