(function() {
    'use strict';

    angular
        .module('events')
        .controller('EventsController', EventsController);

    EventsController.$inject = ['$scope', 'EventsData', 'PositionsData', 'VenuesData'];

    /* @ngInject */
    function EventsController($scope, EventsData, PositionsData, VenuesData) {
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
                positionAmount: null
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
    }
})();
