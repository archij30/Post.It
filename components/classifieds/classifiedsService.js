(function() {

    var ClassifiedsService = function($http, $firebaseArray) {

        this.getClassifieds = function() {
            return $http.get("data/classifieds.json");
        }
        var ref = firebase.database().ref();
        this.getFirebaseRef = function() {
            return {
                ref: $firebaseArray(ref)
            }
        }

    }
    ClassifiedsService.$inject = ["$http", "$firebaseArray"];
    angular.module("ngClassifieds").service("classifiedsService", ClassifiedsService);
}());