(function() {
    'use strict';

    angular
        .module('settings')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$scope'];

    /* @ngInject */
    function SettingsController($scope) {
        var ctrl = this;

        // $scope.positions = PositionsData;
        //
        // $scope.add = function(){
        //     var data = [
        //         {
        //             name: "Kucharz",
        //             basePrice: 25
        //         },
        //         {
        //             name: "Barman",
        //             basePrice: 18
        //         },
        //         {
        //             name: "Kelner",
        //             basePrice: 15
        //         },
        //         {
        //             name: "Pomoc kuchenna",
        //             basePrice: 15
        //         },
        //         {
        //             name: "Sprzątacz",
        //             basePrice: 13
        //         },
        //         {
        //             name: "Manager",
        //             basePrice: 40
        //         }
        //     ];
        //
        //     angular.forEach(data, function(v,k){
        //         $scope.positions.$add(v).then(function(){
        //             console.log('dodany: ', v.name);
        //         })
        //     })
        // }
    }
})();
