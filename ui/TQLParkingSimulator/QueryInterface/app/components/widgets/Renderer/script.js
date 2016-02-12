var mqapp = angular.module('mqapp',['widgetModule','ui.bootstrap'])
    .controller('Controller', ['$scope', function($scope) {
        $scope.name = 'components/widgets/Renderer/template.html';
        $scope.member={};
        $scope.member.templateurl='/app/components/widgets/Renderer/template.html'

    }]);