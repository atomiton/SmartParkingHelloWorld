"use strict";

widgetModule.directive("bindCompiledHtml", function($compile, $timeout) {
    return {
        template: '<div></div>',
        scope: {
            rawHtml: '=bindCompiledHtml'
        },
        link: function(scope, elem, attrs) {
            scope.$watch('rawHtml', function(value) {
                if (!value) return;
                // we want to use the scope OUTSIDE of this directive
                // (which itself is an isolate scope).
                var newElem = $compile(value)(scope.$parent);
                elem.contents().remove();
                elem.append(newElem);
            });
        }
    };
});