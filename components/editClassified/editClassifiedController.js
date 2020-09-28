(function() {
    "use strict";

    var EditClassifiedController = function($scope, $state, $mdSidenav, $mdDialog, classifiedsService, $timeout) {
        var vm = this;
        vm.closeSidePanel = closeSidePanel;
        vm.saveEdit = saveEdit;
        vm.isSidePanelOpen = false;
        vm.classifieds = classifiedsService.getFirebaseRef().ref;
        //vm.classified = $state.params.classified; //classified object that comes through routing

        vm.classifieds.$loaded().then(function(classifieds) {
            vm.classified = classifieds.$getRecord($state.params.id);
        }).catch(function(error) {
            console.log(error);
        });


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

        function saveEdit(classified) {
            //save to firebase
            vm.classifieds.$save(vm.classified).then(function() {
                $scope.$emit('editSaved', 'Changes Saved');
                vm.isSidePanelOpen = false;
            });

        }

    }

    EditClassifiedController.$inject = ["$scope", "$state", "$mdSidenav", "$mdDialog", "classifiedsService", "$timeout"];

    angular.module('ngClassifieds').controller('EditClassifiedController', EditClassifiedController);
}());