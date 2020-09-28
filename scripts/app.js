(function() {
    let ngClassifiedsApp = angular.module("ngClassifieds", ["ngMaterial", "ngAnimate", "ui.router", "firebase"]);
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

        var firebaseConfig = {
            apiKey: "AIzaSyA2hlxG8JRVZg_Kk5ChVZAWN7eE6v8oxLw",
            authDomain: "ngclassifieds-7d6fd.firebaseapp.com",
            databaseURL: "https://ngclassifieds-7d6fd.firebaseio.com",
            projectId: "ngclassifieds-7d6fd",
            storageBucket: "ngclassifieds-7d6fd.appspot.com",
            messagingSenderId: "419063773596",
            appId: "1:419063773596:web:a8a74fac2fa0c24bc2b059",
            measurementId: "G-EQ6W5B431D"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);


    });
}());