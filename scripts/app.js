(function() {
    let ngClassifiedsApp = angular.module("ngClassifieds", ["ngMaterial", "ngAnimate", "ui.router"]);
    ngClassifiedsApp.config(function($mdThemingProvider, $stateProvider) {
        //changing default theme to blue
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('orange');

        $stateProvider
            .state('classifieds', {
                url: "/classifieds",
                templateUrl: "../components/classifieds/views/classifieds.tpl.html",
                controller: 'ClassifiedsController as ctrl'
            });
    });
}());