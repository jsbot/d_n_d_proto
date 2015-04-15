
function Draggable($rootScope, localStorageService) {
    return {
        scope: {
            data: "=data",
            description: "=descr"
        },
        restrict: "A",
        link: function (scope, element, attributes) {

            angular.element(element).attr("draggable", "true");

            element.bind("dragstart", function (e) {

                localStorageService.set("dragElement", {data: scope.data, description: scope.description});
                $rootScope.$emit("LVL-DRAG-START");
            });

            element.bind("dragend", function (e) {
                //$rootScope.$emit("LVL-DRAG-END");
            });
        }
    }
}

function Droppable($rootScope, localStorageService) {
    return {
        restrict: "A",
        scope: {
            drop: "&"
        },
        link: function (scope, element, attributes) {

            element.bind("dragover", function (e) {
                if (e.preventDefault) {
                    e.preventDefault(); // Necessary. Allows us to drop.
                }

                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                // e.dataTransfer.dropEffect = "move";
                return false;
            });

            element.bind("dragenter", function (e) {
                angular.element(e.target).addClass("lvl-over");
            });

            element.bind("dragleave", function (e) {
                angular.element(e.target).removeClass("lvl-over");  // this / e.target is previous target element.
            });

            element.bind("drop", function (e) {
                if (e.preventDefault) {
                    e.preventDefault(); // Necessary. Allows us to drop.
                }
                if (e.stopPropogation) {
                    e.stopPropogation(); // Necessary. Allows us to drop.
                }
                var dragged = localStorageService.get("dragElement");
                localStorageService.remove("dragElement");

                scope.drop()(dragged);
            });

            /* $rootScope.$on("LVL-DRAG-START", function() {
             /!*
             var el = document.getElementById(id);
             angular.element(el).addClass("lvl-target");
             *!/
             });

             $rootScope.$on("LVL-DRAG-END", function() {
             /!*
             var el = document.getElementById(id);
             angular.element(el).removeClass("lvl-target");
             angular.element(el).removeClass("lvl-over");
             *!/
             });*/
        }

    }
}
    app.directive("dndDraggable",Draggable);
    app.directive("dndDroppable",Droppable);