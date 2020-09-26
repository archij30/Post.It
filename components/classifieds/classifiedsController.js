(function() {

    "use strict"
    var ClassifiedsController = function($scope, classifiedsService, $mdSidenav, $mdToast, $mdDialog) {
        var vm = this;

        vm.message = "ngClassifieds";
        vm.editing = false;
        vm.categories = [];

        vm.openSidepanel = openSidepanel;
        vm.closeSidepanel = closeSidepanel;
        vm.deleteClassified = deleteClassified;
        vm.editClassified = editClassified;
        vm.saveClassified = saveClassified;
        vm.saveEdit = saveEdit;




        classifiedsService.getClassifieds().then(function(classifiedsData) {
            vm.classifieds = classifiedsData.data; //getting data object from json object
            vm.categories = getCategories(vm.classifieds);
        }).catch(function(error) {
            console.log(error);
        })





        function openSidepanel() {
            $mdSidenav('left').open();
        }

        function closeSidepanel() {
            $mdSidenav('left').close();
        }

        function saveClassified(classified) {
            if (!classified) {
                return;
            }
            //faking contact, otherwise should come from login info
            var contact = {
                name: "Archi",
                phone: "+91-9876543210",
                email: "aj@gmail.com"
            };
            classified.contact = contact;
            vm.classifieds.push(classified);
            vm.classified = {}; //can be used here because its binded by ng-model on template
            closeSidepanel();
            showToast("Classified saved!");

        }

        function editClassified(classifiedForEditing) {
            vm.editing = true;
            openSidepanel();
            vm.classified = classifiedForEditing;
        }

        function saveEdit() {
            vm.editing = false;
            vm.classified = {};
            closeSidepanel();
            showToast("Classified changes saved!")
        }

        function deleteClassified(event, classifiedForDeleting) {

            var confirm = $mdDialog.confirm()
                .title(`Are you sure you want to delete ${classifiedForDeleting.title} ?`)
                .ok("Yes")
                .cancel("No")
                .targetEvent(event);
            $mdDialog.show(confirm).then(function() {
                var index = vm.classifieds.indexOf(classifiedForDeleting);
                vm.classifieds.splice(index, 1);
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

        function getCategories(classifieds) {
            var categories = [];
            classifieds.forEach(classified => {
                classified.categories.forEach(cat => {
                    if (categories.indexOf(cat) === -1) {
                        categories.push(cat);
                    }
                });
            });
            return categories;
        }
    };
    ClassifiedsController.$inject = ["$scope", "classifiedsService", "$mdSidenav", "$mdToast", "$mdDialog"];
    angular.module("ngClassifieds").controller("ClassifiedsController", ClassifiedsController);

}());