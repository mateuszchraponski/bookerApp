(function() {
    'use strict';

    angular
        .module('venues')
        .controller('VenuesController', VenuesController);

    VenuesController.$inject = ['$scope', '$rootScope', 'VenuesData'];

    /* @ngInject */
    function VenuesController($scope, $rootScope, VenuesData) {
        var ctrl = this;

        $scope.venues = VenuesData;

        $scope.openAddVenueModal = function(){
            $rootScope.$broadcast('openAddVenueModal');
        }

        console.log($scope.venues);

        $scope.deleteVenue = function(item){
            $scope.venues.$remove(item).then(
                function (response) {
                    //success
                    console.log("Lokalizacja usunięta!", $scope.venues);
                },
                function (error) {
                    //error
                    console.log("Błąd podczas zapisu!");
                }
            );
        }

    }
})();
