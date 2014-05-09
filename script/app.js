var pfApp = angular.module('pfApp', []);

pfApp.controller('ContentController', function($scope) {
    $scope.contents = [
        '<a href="http://www.google.com">Google</a><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non malesuada diam, a bibendum risus. Aenean eget pretium felis. Nam sit amet dui aliquet, lacinia urna sit amet, fermentum nisl. Vivamus pulvinar tristique risus vitae malesuada. Mauris quis justo sapien. Integer molestie convallis lorem. Nam ultrices convallis auctor. Phasellus placerat, nunc a accumsan venenatis, magna est adipiscing nisl, tempor convallis orci augue ac magna. Praesent a ipsum vitae magna molestie semper sit amet sed neque. Mauris sed iaculis massa.</span>',
        '<span><span style="font-weight: bold;">Cras elit est, pellentesque hendrerit aliquam sed, </span><a href="https://github.com">git hub</a>fermentum et diam. Fusce placerat laoreet ligula vitae fermentum. Mauris a erat nec turpis hendrerit viverra vel non magna. Maecenas ultrices pharetra quam, sit amet iaculis est porta vel. Aliquam consequat vel quam vel accumsan. Duis et leo ac leo pretium pellentesque. Sed massa diam, volutpat posuere sapien sed, lobortis iaculis justo. Integer ut malesuada purus. Aliquam pretium tempus semper. Aenean auctor dui neque, eu sagittis ante pellentesque sed. Mauris vitae imperdiet neque. Mauris sodales velit magna, congue convallis nisl volutpat id. Nulla interdum lacus id imperdiet ornare.</span>',
        '<span>Nam vehicula, purus ac ultricies vehicula, magna urna pretium leo, sit amet dignissim neque libero a eros. Praesent laoreet volutpat est, vitae aliquam justo suscipit hendrerit. Vestibulum aliquam velit at fermentum egestas. In imperdiet congue aliquet. Nullam nec auctor turpis, sit amet interdum sapien. Integer aliquam pharetra mollis. Morbi et consectetur velit, at pellentesque mi. Nunc adipiscing, libero nec molestie tempor, ante tellus sollicitudin purus, a vestibulum turpis lectus id turpis. Vestibulum in tincidunt risus. Duis fringilla metus ut nunc fringilla, quis volutpat massa eleifend. Sed sollicitudin nibh a quam scelerisque, et venenatis massa malesuada. Pellentesque semper vehicula posuere. Phasellus suscipit velit et luctus luctus. Maecenas iaculis ligula sed justo consequat fermentum.</span>'
      ];
})

.directive('pfSummarize', function() {
    function link(scope, element, attrs) {

        var maxLength = scope.$eval(attrs.pfMaxLength) || 250;
        var endString = angular.isDefined(attrs.pfEndString) ? attrs.pfEndString : "...";
        scope.parentClass = angular.isDefined(attrs.class) ? attrs.class : "";

        function splitNodes(root) {
            var length = 0,
            result = [],
            max = maxLength,
            splitChildNodes = function(nodes) {
                var i = 0, clone;
                if (length >= max) {
                    return;
                }
                for (; i < nodes.length; i++) {
                    if (length >= max) {
                        return;
                    }
                    var node = nodes[i];
                    if (node.nodeType === 1) { //element node
                        clone = node.cloneNode(false);
                        result[result.length - 1].appendChild(clone);
                        result.push(clone);
                        splitChildNodes(node.childNodes);
                        result.pop();
                    } else if (node.nodeType === 3) { //text node
                        if (length + node.length < max) {
                            result[result.length - 1].appendChild(node.cloneNode(false));
                            length += node.length;
                        } else { // we're over the max, so summarize it 
                            var text = angular.element(node).text();
                            var lastIndex = Math.min(max - length, text.substring(0, max - length).lastIndexOf(' '));
                            text = text.substring(0, lastIndex) + endString;
                            result[result.length - 1].appendChild(document.createTextNode(text));
                            length += node.length;
                            return;
                        }
                    }
                }
            };
            result.push(root.cloneNode(false));
            splitChildNodes(root.childNodes);
            return angular.element(result.pop().childNodes);
        };

        var contentElement = element[0].querySelector('.pf-content');
        scope.$watch(attrs.ngModel, function(value) {
            if (angular.isDefined(value)) {
                var nodes = splitNodes(contentElement);
                scope.summary = (angular.element("<div />").append(nodes)).html();
            }
        });
 
        scope.showMore = false;

    }
    return {
        require:"ngModel",
        restrict: 'AE',
        replace: true,
        templateUrl: "template/summarize.html",
        link: link
    }
});
