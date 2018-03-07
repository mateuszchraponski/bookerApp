(function() {
    'use strict';

    angular
        .module('events')
        .controller('EventsController', EventsController);

    EventsController.$inject = ['$scope', '$rootScope', 'EventsData', 'PositionsData', 'VenuesData'];

    /* @ngInject */
    function EventsController($scope, $rootScope, EventsData, PositionsData, VenuesData) {
        var ctrl = this;

        $scope.events = EventsData;
        $scope.positions = PositionsData;
        $scope.venues = VenuesData;

        angular.forEach($scope.events, function(v,k){
            // venue name
            var venueName = $scope.venues.$getRecord(v.eventVenue);
            v.eventVenueName = venueName.venueName;

            // need name
            angular.forEach(v.eventNeeds, function(va, ke){
                var positionName = $scope.positions.$getRecord(va.position);
                va.positionName = positionName.name;
            })
        });


        $scope.eventNeeds = [];

        $scope.saveEvent = function(){
            var data = {
                eventName: $scope.eventName,
                eventStartDate: $scope.eventStartDate,
                eventEndDate: $scope.eventEndDate,
                eventNeeds: $scope.eventNeeds,
                eventVenue: $scope.eventVenue
            }

            console.log("dane do zapisania:", data);

            $scope.events.$add(data).then(
                function(resp){
                    console.log("Zapisano wydarzenie", resp);

                    $scope.eventName = undefined;
                    $scope.eventStartDate = undefined;
                    $scope.eventEndDate = undefined;
                    $scope.eventNeeds = [];
                    $scope.eventVenue = undefined;

                },
                function(err){
                    console.log("Błąd zapisu", err);
                }
            );
        }

        $scope.addEventNeed = function(){
            $scope.eventNeeds.push({
                position: null,
                positionAmount: null,
                bookedEmployees: []
            });
            console.log($scope.eventNeeds);
        }

        $scope.addEventNeed();

        $scope.deleteEvent = function(item){
            $scope.events.$remove(item).then(
                function (response) {
                    //success
                    console.log("Wydarzenie usunięte!", $scope.events);
                },
                function (error) {
                    //error
                    console.log("Błąd podczas zapisu!");
                }
            );
        }

        $scope.openBookEmployeesModal = function(ev){
            $rootScope.$broadcast('openBookEmployeesModal', ev);
        }

        $scope.openEventBookingListModal = function(ev){
            $rootScope.$broadcast('openEventBookingListModal', ev);
        }

        $rootScope.$on('updateEventBookEmployee', function(e, ev){
            console.log('try save', ev);
            $scope.events.$save(ev).then(
                function(resp){
                    console.log('zapisano :)');
                },
                function(resp){
                    console.log('dupa', resp);
                }
            )
        });
    }
})();
