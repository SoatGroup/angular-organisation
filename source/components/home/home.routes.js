(function() {
    angular
        .module('Blog')
        .config(['$routeProvider', 'localeResolverProvider', 'config', homeRoutes]);

    ///////////////

    function homeRoutes($routeProvider, localeResolverProvider, config) {
        var langPath = '/resources/locale-' + config.defaultLocation + '.json';

        $routeProvider
            .when('/', {
                controller: 'HomeController',
                controllerAs: 'homeVm',
                templateUrl: 'partials/_home.html',
                resolve: {
                    loadLang: localeResolverProvider.resolve(langPath),
                    data: ['$q', '$sce', 'news', getDataHome]
                }
            })
            .otherwise({redirectTo: '/'});

        ///////////////

        function getDataHome($q, $sce, news) {
            var defer = $q.defer();

            resolve();

            return defer.promise;

            ///////////////

            function resolve() {
                news
                    .get()
                    .then(function(data) {
                        defer.resolve(data);
                    }, function(response) {
                        defer.reject(response);
                    });
            }
        }
    }
})();
