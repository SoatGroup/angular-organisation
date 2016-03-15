(function () {
    angular
        .module('Blog')
        .controller('ArticlesListController', ['data', ArticlesListController]);

    ///////////////

    function ArticlesListController(data) {
        var vm = this;

        // Attributes
        vm.title = 'Liste des articles';
        vm.articles = [];

        fetchDatas(data);

        ///////////////

        function fetchDatas(data) {
            vm.articles = data;
        }
    }
})();
