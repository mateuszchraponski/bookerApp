(function() {
    'use strict';

    angular
        .module('settings')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$scope','calculateService','PositionsData'];


    /* @ngInject */
    function SettingsController($scope, calculateService, PositionsData) {
        var ctrl = this;
        var hours = 8;
        var amount = 10.50;
        var pensja = calculateService.calculateContract(hours, amount);
        console.log(pensja);
        $scope.positions = PositionsData;
        $scope.savePosition = function () {
            var data = {
                name: $scope.positionName,
                basePrice: $scope.positionAmount
            }

            $scope.positions.$add(data).then(
                function (resp) {
                    console.log("Zapisano");
                    $scope.positionName = undefined,
                    $scope.positionAmount = undefined;
                });
        }
        $scope.deletePosition = function (item) {
            $scope.positions.$remove(item).then(
                function (resp) {
                    console.log("usunietor");
                }
            )
        }
        $scope.updatePosition = function (item) {

            item.editMode = false;
            $scope.positions.$save(item).then(
                function(resp) {
                    console.log("zapisano");

                }
            )
        }
    }
})();
