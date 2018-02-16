(function () {
    var dateTimePicker = function ($rootScope) {

        return {
            require: '?ngModel',
            restrict: 'AE',
            scope: {
                pick12HourFormat: '@',
                language: '@',
                useCurrent: '@',
                location: '@',
                model: '=ngModel'
            },
            link: function (scope, elem, attrs, ctrl) {
                elem.datetimepicker({
                    pick12HourFormat: scope.pick12HourFormat,
                    language: scope.language,
                    useCurrent: scope.useCurrent,
                    format: "YYYY-MM-DD HH:mm"
                })

                //Local event change
                elem.on('blur', function () {
                    scope.model = elem[0].value;
                    scope.$apply();
                })
            }
        };
    }

    angular.module('dateTimeSandbox', []).run(['$rootScope', function ($rootScope) {
    }]).directive('dateTimePicker', dateTimePicker);
})();
