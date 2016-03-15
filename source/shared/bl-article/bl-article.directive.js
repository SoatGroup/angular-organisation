(function() {
    angular
        .module('Blog')
        .directive('blArticle', ['$sce', blArticle]);

    ///////////////

    function blArticle($sce) {
        var directive = {
            restrict: 'E',
            templateUrl: 'partials/_bl-article.directive.html',
            link: link,
            scope: {
                data: '='
            }
        };

        return directive;

        ///////////////

        function link(scope, element) {
            scope.data.content = $sce.trustAsHtml(scope.data.content);
        }
    }
})();
