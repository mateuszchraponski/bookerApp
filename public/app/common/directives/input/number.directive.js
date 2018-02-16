(function() {
    'use strict';

    angular
        .module('directives')
        .directive('number', number);

    /* @ngInject */
    function number() {
        var directive = {
            restrict: 'A',
            scope: {
                number: '=',
            },
            require: 'ngModel',
            link: linkFunc,
            controller: NumberController,
            controllerAs: 'ctrl',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            // console.log(scope, el, attr, ctrl);

            var NUMBER_REGEXP = "^\\s*(\\-|\\+)?(\\d+|(\\d*(\\.\\d*))|(\\d*(\\,\\d*)))\\s*$";
            var regex = new RegExp(NUMBER_REGEXP);

            function formatNumber(value){
                return value.toString().replace(',', '.');
            }

            function round(value, decimals) {
                var d = Math.pow(10, decimals);
                return Math.round(value * d) / d;
            }

            scope.$watch(function () {
                return ctrl.$modelValue;
            }, function(newValue) {
                // console.log('actual: ', newValue);
                if(angular.isUndefined(newValue) || newValue == "")
                    return;

                if(regex.test(newValue)){
                    newValue = formatNumber(newValue);
                } else {
                    var length = newValue.length - 1;
                    newValue = newValue.substring(0, length);
                    if(newValue == '' || isNaN(newValue))
                        newValue = '0';
                }

                if(newValue.endsWith('.')){
                    var rounded = newValue;
                } else {
                    var rounded = round(parseFloat(newValue), 2).toString();
                }

                ctrl.$setViewValue(rounded);
                ctrl.$render();
            });
        }
    }

    NumberController.$inject = ['$scope'];

    /* @ngInject */
    function NumberController($scope) {
        var ctrl = this;
    }
})();
