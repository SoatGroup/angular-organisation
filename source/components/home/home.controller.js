(function () {
    angular
        .module('Blog')
        .controller('HomeController', ['data', HomeController]);

    ///////////////

    function HomeController(data) {
        var vm = this;

        // Attributes
        vm.title = 'Bienvenue sur mon blog';
        vm.news = [];

        fetchDatas(data);

        ///////////////

        function fetchDatas(data) {
            vm.news = data;
        }
    }
})();
