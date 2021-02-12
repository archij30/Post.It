(function() {
    "use strict"
    angular.module("ngClassifieds").directive("classifiedCard", function() {
        return {
            restrict: "E",
            templateUrl: "components/classifieds/classifiedCard/classifiedCard.tpl.html",
            controller: ClassifiedCardController,
            controllerAs: "ctrl",
            scope: {
                classifieds: "=",
                category: "=",
                classifiedsFilterText: "="

            }
        }

        function ClassifiedCardController($scope, $state, $mdDialog) {
            var vm = this;
            vm.editClassified = editClassified;
            vm.deleteClassified = deleteClassified;

            function editClassified(classifiedForEditing) {
                vm.editing = true;
                // openSidepanel();
                // vm.classified = classifiedForEditing;
                $state.go('classifieds.edit', {
                    id: classifiedForEditing.$id, //id is mapped to url : edit/:id in editClassifiedController
                    //classified: classifiedForEditing
                });

            }

            function deleteClassified(event, classifiedForDeleting) {

                var confirm = $mdDialog.confirm()
                    .title(`Are you sure you want to delete ${classifiedForDeleting.title} ?`)
                    .ok("Yes")
                    .cancel("No")
                    .targetEvent(event);
                $mdDialog.show(confirm).then(function() {
                    // var index = vm.classifieds.indexOf(classifiedForDeleting);
                    // vm.classifieds.splice(index, 1);
                    $scope.classifieds.$remove(classifiedForDeleting);
                    showToast("Classified deleted!")
                }, function() {

                });

            }

            function showToast(message) {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent(message)
                    .position('top right')
                    .hideDelay(3000)
                );
            }
        }
    })
}());