(function() {
    'use strict';

    angular
        .module('directives')
        .directive('addVenueModal', addVenueModal);

    /* @ngInject */
    function addVenueModal() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/common/directives/modals/add-venue/add-venue.directive.html',
            scope: {
            },
            link: linkFunc,
            controller: AddVenueController,
            controllerAs: 'addVenueCtrl',
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

    AddVenueController.$inject = ['$scope', '$rootScope', 'DbService', 'Fire'];

    /* @ngInject */
    function AddVenueController($scope, $rootScope, DbService, Fire) {
        var ctrl = this;

        $rootScope.$on('openAddVenueModal', function(e){
            ctrl.showModal();
        });

        var venuesRef = DbService.userDb($rootScope.firebaseUser.uid).child('venues');
        $scope.venues = Fire.array(venuesRef);

        ctrl.addVenue = function(){
            var data = {
                venueName: $scope.venueName,
                venueAddress: $scope.venueAddress,
                venuePhoneNumber: $scope.venuePhoneNumber
            }

            $scope.venues.$add(data).then(
                function (response) {
                    //success
                    console.log("Lokalizacja zapisana!", $scope.venues);

                    $scope.venueName = undefined;
                    $scope.venueAddress = undefined;
                    $scope.venuePhoneNumber = undefined;

                    ctrl.hideModal();

                },
                function (error) {
                    //error
                    console.log("Błąd zapisu!");
                }
            );

        }
    }
})();
