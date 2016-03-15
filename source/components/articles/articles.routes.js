(function() {
    angular
        .module('Blog')
        .config(['$routeProvider', 'localeResolverProvider', 'config', articlesRoutes]);

    ///////////////

    function articlesRoutes($routeProvider, localeResolverProvider, config) {
        var langPath = '/resources/locale-' + config.defaultLocation + '.json';

        $routeProvider
            .when('/articles', {
                controller: 'ArticlesListController',
                controllerAs: 'articlesVm',
                templateUrl: 'partials/_articles-list.html',
                resolve: {
                    loadLang: localeResolverProvider.resolve(langPath),
                    data: ['$q', 'article', getDataList]
                }
            })
            .when('/article/:idArticle', {
                controller: 'ArticleDetailController',
                controllerAs: 'articlesVm',
                templateUrl: 'partials/_article-detail.html',
                resolve: {
                    loadLang: localeResolverProvider.resolve(langPath),
                    data: ['$q', '$route', 'article', getDataDetail]
                }
            });

        ///////////////

        function getDataList($q, article) {
            var defer = $q.defer();

            resolve();

            return defer.promise;

            ///////////////

            function resolve() {
                article
                    .get()
                    .then(function(data) {
                        defer.resolve(data);
                    }, function(response) {
                        defer.reject(response);
                    });
            }
        }

        function getDataDetail($q, $route, article) {
            var defer = $q.defer();

            resolve();

            return defer.promise;

            ///////////////

            function resolve() {
                article
                    .get($route.current.params.idArticle)
                    .then(function(data) {
                        defer.resolve(data);
                    }, function(response) {
                        defer.reject(response);
                    });
            }
        }
    }
})();
