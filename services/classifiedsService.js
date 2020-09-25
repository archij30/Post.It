(function() {

    var ClassifiedsService = function($http) {

        this.getClassifieds = function() {
            return $http.get("data/classifieds.json");
        }

    }
    ClassifiedsService.$inject = ["$http"];
    angular.module("ngClassifieds").service("classifiedsService", ClassifiedsService);
}());