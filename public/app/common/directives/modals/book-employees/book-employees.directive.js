(function() {
    'use strict';

    angular
        .module('directives')
        .directive('bookEmployees', bookEmployees);

    /* @ngInject */
    function bookEmployees() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/common/directives/modals/book-employees/book-employees.directive.html',
            scope: {
            },
            link: linkFunc,
            controller: BookEmployeesController,
            controllerAs: 'bookEmployeesCtrl',
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

    BookEmployeesController.$inject = ['$scope', '$rootScope', 'DataService'];

    /* @ngInject */
    function BookEmployeesController($scope, $rootScope, DataService) {
        var ctrl = this;

        $rootScope.$on('openBookEmployeesModal', function(e, ev){
            ctrl.showModal();

            $scope.event = ev;
            DataService.getEmployees().then(
                function(data){
                    $scope.employees = data;

                    angular.forEach($scope.employees, function(v,k){
                        v.id = v.$id;
                    })

                    console.log($scope.employees);
                }
            );
            console.log(ev, $scope.employees);
        });

        $scope.bookEmployee = function(need, employee){

            if(angular.isUndefined(need.bookedEmployees)){
                need.bookedEmployees = [];
            }
            
            need.bookedEmployees.push(employee);
            employee.booked = true;

            $rootScope.$broadcast('updateEventBookEmployee', $scope.event);

            console.log(need, employee);
        }

        $scope.unbook = function(need, employee){
            // angular.forEach(need.bookedEmployees, function(v,k){
            //     if(v.id == employee.$id){
            //         console.log('match', v.id);
            //     }
            // });
            //
            // console.log(need.bookedEmployees, need);
        }

    }
})();
