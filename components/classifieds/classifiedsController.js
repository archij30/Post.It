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
            classified.id = vm.classifieds.length + 1;
            saveClassified(classified);
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
                id: classifiedForEditing.id, //id is mapped to url : edit/:id in editClassifiedController
                classified: classifiedForEditing
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

        var data = [{
                "id": "1",
                "title": "20 Foot Equipment Trailer",
                "description": "2013 rainbow trailer 20 feet x 82 inch deck area, two 5,000 lb axels, electric brakes, two pull out ramps, break away box, spare tire.",
                "price": 6000,
                "posted": "2015-10-24",
                "contact": {
                    "name": "John Doe",
                    "phone": "(555) 555-5555",
                    "email": "johndoe@gmail.com"
                },
                "categories": [
                    "Vehicles",
                    "Parts and Accessories"
                ],
                "image": "data:image/jpeg;base64,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",
                "views": 213
            },
            {
                "id": "2",
                "title": "Canada Goose Jacket",
                "description": "Red woman's Canada Goose Montebello jacket. It was used for two seasons. This jacket retails for $745. The jacket has been professionally cleaned since it was last worn by anyone.",
                "price": 500,
                "posted": "2015-10-28",
                "contact": {
                    "name": "Jane Doe",
                    "phone": "(555) 555-5555",
                    "email": "janedoe@gmail.com"
                },
                "categories": [
                    "Clothing"
                ],
                "image": "http://canadagoose-jacket.weebly.com/uploads/9/2/3/3/9233177/9087323_orig.jpg",
                "views": 422
            },
            {
                "id": "3",
                "title": "Baby Crib and Matress",
                "description": "Good condition.",
                "price": 50,
                "posted": "2015-10-27",
                "contact": {
                    "name": "Jane Doe",
                    "phone": "(555) 555-5555",
                    "email": "janedoe@gmail.com"
                },
                "categories": [
                    "Furniture"
                ],
                "image": "http://images.landofnod.com/is/image/LandOfNod/Crib_Anderson_Nat_V1/$web_setitem$/1308310657/andersen-crib-maple.jpg",
                "views": 23
            },
            {
                "id": "4",
                "title": "Leather Sofa",
                "description": "Blue leather sofa for sale.  Good condition but small tear on one cushion.",
                "price": 250,
                "posted": "2015-11-01",
                "contact": {
                    "name": "John Doe",
                    "phone": "(555) 555-5555",
                    "email": "johndoe@gmail.com"
                },
                "categories": [
                    "Furniture"
                ],
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbi5YX-WGHO4Jp08vIg5HWz3w-mDJu9YwN2Yv_Nwnup585lUvkBYVTkmipYg&usqp=CAc",
                "views": 77
            },
            {
                "id": "5",
                "title": "MacBook Air",
                "description": "2013 MacBook Air. Great condition, but a few scratches.",
                "price": 1150,
                "posted": "2015-11-02",
                "contact": {
                    "name": "John Doe",
                    "phone": "(555) 555-5555",
                    "email": "johndoe@gmail.com"
                },
                "categories": [
                    "Electronics",
                    "Computer Parts and Accessories"
                ],
                "image": "http://cdn.macrumors.com/article-new/2014/11/macbook_air_yosemite-800x450.jpg?retina",
                "views": 889
            },
            {
                "id": "6",
                "title": "2008 Dodge Caliber",
                "description": "Battery blanket and block heater installed. Winter tires, good tread left are on the car currently. Car comes with 4 summer tires with also good treads left. Hydraulic power steering fluid line installed so this won't break on you in the cold Yellowknife winters! Synthetic oil used, good for 1000+ more KMs. AC/Sunroof/power doors/steering, CD player/radio. Red accented dash and upolstry.",
                "price": 4800,
                "posted": "2015-11-03",
                "contact": {
                    "name": "John Doe",
                    "phone": "(555) 555-5555",
                    "email": "johndoe@gmail.com"
                },
                "categories": [
                    "Vehicles",
                    "Cars"
                ],
                "image": "http://images.buysellsearch.com/image/orig/8dfc4f6c5d411130d19dedd28d61bc2b/2009-dodge-caliber-se.jpg",
                "views": 423
            }
        ];

        var firebase = classifiedsService.getFirebaseRef().ref;

        angular.forEach(data, function(item) {
            firebase.$add(item);
        })
    };
    ClassifiedsController.$inject = ["$scope", "classifiedsService", "$mdSidenav", "$mdToast", "$mdDialog", "$state", "$http", "$firebaseArray"];
    angular.module("ngClassifieds").controller("ClassifiedsController", ClassifiedsController);

}());