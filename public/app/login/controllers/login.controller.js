(function() {
    'use strict';

    angular
        .module('login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'AuthService'];

    /* @ngInject */
    function LoginController($scope, AuthService) {
        var ctrl = this;

        this.registerVia = function(providerName){
            AuthService.auth().$signInWithPopup(providerName).then(
                function(result) {
                    var profileRef = firebase.database().ref('users/'+ result.user.uid);

                    profileRef.update({
                        lastLoginDate: moment().format('YYYY-MM-DD HH:mm')
                    });
                }, function(err){
                    if(err.code == "auth/account-exists-with-different-credential"){
                        console.log("Użytkownik jest zarejestrowany innymi danymi - inny dostawca.");
                    }
                });
        }

        $scope.registerViaFacebook = function(){
            ctrl.registerVia("facebook");
        }

        $scope.registerViaGoogle = function(){
            ctrl.registerVia("google");
        }
    }
})();
