(function() {
    let ngClassifiedsApp = angular.module("ngClassifieds", ["ngMaterial", "ngAnimate"]);
    ngClassifiedsApp.config(function($mdThemingProvider) {
        //changing default theme to blue
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('orange');

    });
}());