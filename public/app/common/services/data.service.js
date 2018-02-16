(function() {
    'use strict';

    angular
        .module('bookerApp')
        .service('DataService', DataService);

    DataService.$inject = ['$window', 'AuthService', 'DbService', 'Fire'];

    /* @ngInject */
    function DataService($window, AuthService, DbService, Fire) {

        var srv = this;

        this.getEmployees = function() {
            return AuthService.auth().$requireSignIn().then(function(user){
                var ref = DbService.userDb(user.uid).child('employees');
                return Fire.array(ref).$loaded();
            });
        }

        this.getVenues = function() {
            return AuthService.auth().$requireSignIn().then(function(user){
                var ref = DbService.userDb(user.uid).child('venues');
                return Fire.array(ref).$loaded();
            });
        }

        this.getPositions = function() {
            return AuthService.auth().$requireSignIn().then(function(user){
                var ref = DbService.userDb(user.uid).child('positions');
                return Fire.array(ref).$loaded();
            });
        }

        this.getEvents = function() {
            return AuthService.auth().$requireSignIn().then(function(user){
                var ref = DbService.userDb(user.uid).child('events');
                return Fire.array(ref).$loaded();
            });
        }

    }
})();
