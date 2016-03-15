(function () {
    angular
        .module('Blog')
        .controller('ArticleDetailController', ['$sce', 'data', ArticleDetailController]);

    ///////////////

    function ArticleDetailController($sce, data) {
        var vm = this;

        // Attributes
        vm.article = {};

        fetchDatas(data);

        ///////////////

        function fetchDatas(data) {
            data.content = $sce.trustAsHtml(data.content);
            vm.article = data;
        }
    }
})();
