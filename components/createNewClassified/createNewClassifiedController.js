(function() {
    "use strict";

    var NewClassifiedController = function($scope, $state, $mdSidenav, $mdDialog, classifiedsService, $timeout) {
        var vm = this;
        vm.closeSidePanel = closeSidePanel;
        vm.saveClassified = saveClassified;
        $timeout(function() {
            $mdSidenav('left').open();
        });
        $scope.$watch('ctrl.isSidePanelOpen', function(newValue) {
            if (newValue == false) {
                $mdSidenav('left').close()
                    .then(function() {
                        $state.go('classifieds')
                    });
            }
        });


        function closeSidePanel() {
            vm.isSidePanelOpen = false;
        }

        function saveClassified(classified) {
            if (!classified) {
                return;
            }
            var contact = {
                name: "Archi",
                phone: "+91-9876543210",
                email: "aj@gmail.com"
            };
            classified.contact = contact;
            $scope.$emit('newClassified', classified);
            vm.isSidePanelOpen = false;
        }

    }

    NewClassifiedController.$inject = ["$scope", "$state", "$mdSidenav", "$mdDialog", "classifiedsService", "$timeout"];

    angular.module('ngClassifieds').controller('NewClassifiedController', NewClassifiedController);
}());