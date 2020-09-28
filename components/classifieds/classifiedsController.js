(function() {

    "use strict"
    var ClassifiedsController = function($scope, classifiedsService, $mdSidenav, $mdToast, $mdDialog, $state, $http, $firebaseArray) {
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
        vm.classifieds = classifiedsService.getFirebaseRef().ref;


        //$loaded: provided by firebase, wait for all data to be loaded then do something
        vm.classifieds.$loaded().then(function(classifieds) {
            vm.categories = getCategories(classifieds);
        }).catch(function(error) {
            console.log(error);
        });

        // classifiedsService.getClassifieds().then(function(classifiedsData) {
        //     vm.classifieds = classifiedsData.data; //getting data object from json object
        //     vm.categories = getCategories(vm.classifieds);
        // }).catch(function(error) {
        //     console.log(error);
        // })

        $http.get('http://api.github.com/users').then(function(response) {
            console.log(response);
        })


        $scope.$on('newClassified', function(event, classified) {
            // classified.id = vm.classifieds.length + 1;
            // saveClassified(classified);
            vm.classifieds.$add(classified);
            showToast("Classified added");
        })

        $scope.$on('editSaved', function(event, message) {
            showToast(message);
        })


        function openSidepanel() {
            // $mdSidenav('left').open();
            $state.go('classifieds.new')
        }

        function closeSidepanel() {
            $mdSidenav('left').close();
        }

        function saveClassified(classified) {
            if (!classified) {
                return;
            }
            //faking contact, otherwise should come from login info

            vm.classifieds.push(classified);
            vm.classified = {}; //can be used here because its binded by ng-model on template
            closeSidepanel();
            showToast("Classified saved!");

        }

        function editClassified(classifiedForEditing) {
            // vm.editing = true;
            // openSidepanel();
            // vm.classified = classifiedForEditing;
            $state.go('classifieds.edit', {
                id: classifiedForEditing.$id, //id is mapped to url : edit/:id in editClassifiedController
                //classified: classifiedForEditing
            });
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
                // var index = vm.classifieds.indexOf(classifiedForDeleting);
                // vm.classifieds.splice(index, 1);
                vm.classifieds.$remove(classifiedForDeleting);
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

        function getCategories(classifieds) {
            var categories = [];
            classifieds.forEach(classified => {
                if (classified.categories) {
                    classified.categories.forEach(cat => {
                        if (categories.indexOf(cat) === -1) {
                            categories.push(cat);
                        }
                    });
                }

            });
            return categories;
        }

        //var data= some data;
        //add data to firebase: 1 time
        // var firebase = classifiedsService.getFirebaseRef().ref;

        // angular.forEach(data, function(item) {
        //     firebase.$add(item);
        // })
    };
    ClassifiedsController.$inject = ["$scope", "classifiedsService", "$mdSidenav", "$mdToast", "$mdDialog", "$state", "$http", "$firebaseArray"];
    angular.module("ngClassifieds").controller("ClassifiedsController", ClassifiedsController);

}());