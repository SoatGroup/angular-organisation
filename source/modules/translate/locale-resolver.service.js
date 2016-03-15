(function() {
    angular
        .module('Translate')
        .provider('localeResolver', localeResolver);

    ///////////////

    function localeResolver() {
        var self = this;

        self.$get = $get;
        self.resolve = resolve;

        ///////////////

        function $get() {
            return self;
        }

        function resolve(langPath) {
            return ['$q', 'localeResource', load];

            ///////////////

            function load($q, localeResource) {
                var defer = $q.defer();

                resolveIt();

                return defer.promise;

                ///////////////

                function resolveIt() {
                    if(localeResource.getTranslate() === undefined) {
                        localeResource.loadLang(langPath)
                            .then(function(data) {
                                defer.resolve();
                            }, function(results) {
                                defer.reject();
                            });
                    } else {
                        defer.resolve();
                    }
                }
            }
        }
    }
})();
