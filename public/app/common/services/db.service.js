(function() {
    'use strict';

    angular
        .module('bookerApp')
        .service('DbService', DbService);

    DbService.$inject = ['$rootScope', '$firebaseArray'];

    /* @ngInject */
    function DbService($rootScope, $firebaseArray) {
        var srv = this;

        this.db = function() {
            return firebase.database().ref();
        }

        this.userDb = function(uid){
            var db = srv.db().child('userDb').child(uid);
            return db;
        }

        this.sharedDb = function(table){
            var db = srv.db().child('shared').child(table);
            return db;
        }

        this.privDb = function(uid){
            var db = srv.db().child('users').child(uid);
            return db;
        }

        this.orderBy = function(ref, by, method, data){
            data = data ? data : null;

            switch (method) {
                case 'equal':
                    return ref.orderByChild(by).equalTo(data);
                    break;
                case 'between':
                    return ref.orderByChild(by).startAt(data.start).endAt(data.end)
                    break;
                case 'greather-than':
                    return ref.orderByChild(by).startAt(data.start)
                    break;
                case 'less-than':
                    return ref.orderByChild(by).endAt(data.end)
                    break;
                default:
                    return ref;
            }
        }
    }
})();
