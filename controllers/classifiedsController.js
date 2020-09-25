(function() {

    "use strict"
    var ClassifiedsController = function($scope, classifiedsService, $mdSidenav, $mdToast, $mdDialog) {
        $scope.message = "ngClassifieds";
        $scope.editing = false;
        $scope.categories = [];


        classifiedsService.getClassifieds().then(function(classifiedsData) {
            $scope.classifieds = classifiedsData.data; //getting data object from json object
            $scope.categories = getCategories($scope.classifieds);
        }).catch(function(error) {
            console.log(error);
        })





        $scope.openSidepanel = function() {
            $mdSidenav('left').open();
        }

        $scope.closeSidepanel = function() {
            $mdSidenav('left').close();
        }

        $scope.saveClassified = function(classified) {
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
            $scope.classifieds.push(classified);
            $scope.classified = {}; //can be used here because its binded by ng-model on template
            $scope.closeSidepanel();
            showToast("Classified saved!");

        }

        $scope.editClassified = function(classifiedForEditing) {
            $scope.editing = true;
            $scope.openSidepanel();
            $scope.classified = classifiedForEditing;
        }

        $scope.saveEdit = function() {
            $scope.editing = false;
            $scope.classified = {};
            $scope.closeSidepanel();
            showToast("Classified changes saved!")
        }

        $scope.deleteClassified = function(event, classifiedForDeleting) {

            var confirm = $mdDialog.confirm()
                .title(`Are you sure you want to delete ${classifiedForDeleting.title} ?`)
                .ok("Yes")
                .cancel("No")
                .targetEvent(event);
            $mdDialog.show(confirm).then(function() {
                var index = $scope.classifieds.indexOf(classifiedForDeleting);
                $scope.classifieds.splice(index, 1);
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