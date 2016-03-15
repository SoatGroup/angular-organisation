(function() {
    angular
        .module('Blog')
        .directive('blNews', ['$sce', blNews]);

    ///////////////

    function blNews($sce) {
        var directive = {
            restrict: 'E',
            templateUrl: 'partials/_bl-news.directive.html',
            link: link,
            scope: {
                data: '='
            }
        };

        return directive;

        ///////////////

        function link(scope, element) {
            scope.data.content = $sce.trustAsHtml(scope.data.content);

            // Methods

            scope.toggleMore = toggleMore;

            ///////////////

            // Methods definition

            function toggleMore() {
                scope.data.more = !scope.data.more;
            }
        }
    }
})();
