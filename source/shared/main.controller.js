(function () {
    angular
        .module('Blog')
        .controller('MainController', ['$rootScope', '$location', ArticleDetailController]);

    ///////////////

    function ArticleDetailController($rootScope, $location) {
        var vm = this;

        // Attributes

        vm.currentRoute = '';

        // Events

        $rootScope.$on('$routeChangeSuccess', routeChangeSuccess);

        ///////////////

        // Events definitions

        function routeChangeSuccess() {
            if($location.path() == '/')
                vm.currentRoute = 'home';
            else
                vm.currentRoute = 'articles';
        }
    }
})();
