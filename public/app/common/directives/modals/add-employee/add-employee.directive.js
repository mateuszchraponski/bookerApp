(function() {
    'use strict';

    angular
        .module('directives')
        .directive('addEmployeeModal', addEmployeeModal);

    /* @ngInject */
    function addEmployeeModal() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/common/directives/modals/add-employee/add-employee.directive.html',
            scope: {
            },
            link: linkFunc,
            controller: AddEmployeeController,
            controllerAs: 'addEmployeeCtrl',
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

    AddEmployeeController.$inject = ['$scope', '$rootScope', 'DbService', 'Fire'];

    /* @ngInject */
    function AddEmployeeController($scope, $rootScope, DbService, Fire) {
        var ctrl = this;

        $rootScope.$on('openAddEmployeeModal', function(e){
            ctrl.showModal();
        });

        var employeesRef = DbService.userDb($rootScope.firebaseUser.uid).child('employees');
        $scope.employees = Fire.array(employeesRef);

        var positionsRef = DbService.userDb($rootScope.firebaseUser.uid).child('positions');
        $scope.positions = Fire.array(positionsRef);

        ctrl.addEmployee = function(){
            var data = {
                employeeName: $scope.employeeName,
                employeePersonalID: $scope.employeePersonalID,
                employeePositions: $scope.employeePositions
            }

            var positionsSelected = [];

            angular.forEach(data.employeePositions, function(v,k){
                var pos = $scope.positions.$getRecord(v);
                positionsSelected.push({
                    id: pos.$id,
                    name: pos.name,
                    basePrice: pos.basePrice
                });
            });

            data.employeePositions = positionsSelected;

            var baseForBirthDate = $scope.employeePersonalID.toString().substr(0, 6);

            var date = moment(baseForBirthDate, 'YYMMDD').format("DD-MM-YYYY");
            data.birthDate = date;

            $scope.employees.$add(data).then(
                function (response) {
                    //success
                    console.log("Pracownik zapisany!", $scope.employees);

                    $scope.employeeName = undefined;
                    $scope.employeePersonalID = undefined;
                    $scope.employeePositions = undefined;

                    ctrl.hideModal();

                },
                function (error) {
                    //error
                    console.log("Dupa i kamieni kupa :)!");
                }
            );

        }
    }
})();
