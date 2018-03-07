(function() {
    'use strict';

    angular
        .module('directives')
        .directive('tabs', tabs);

    /* @ngInject */
    function tabs() {
        var directive = {
            restrict: 'A',
            link: linkFunc,
            controller: TabsController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            $(el).on('click', function(e){
                e.preventDefault();
                $(el).tab('show');
            })
        }
    }

    TabsController.$inject = ['$scope'];

    /* @ngInject */
    function TabsController($scope) {
        var vm = this;
    }
})();
