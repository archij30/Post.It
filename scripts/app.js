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
            }).state('classifieds.new', {
                url: '/new',
                templateUrl: "../components/createNewClassified/views/createNewClassified.tpl.html",
                controller: 'NewClassifiedController as ctrl'
            }).state('classifieds.edit', {
                url: '/edit/:id', //id will act as a variablle because of colon, id will be mapped with what is sent
                templateUrl: "../components/editClassified/views/editClassified.tpl.html",
                controller: 'EditClassifiedController as ctrl',
                params: {
                    classified: null
                }
            });
    });
}());