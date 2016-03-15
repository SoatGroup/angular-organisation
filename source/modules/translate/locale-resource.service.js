(function() {
    angular
        .module('Translate')
        .factory('localeResource', ['$q', '$http', function($q, $http) {
            var translate = undefined;

            return {
                getTranslate: getTranslate,
                loadLang: loadLang
            }

            ///////////////

            function getTranslate() {
                return translate;
            }

            function loadLang(path) {
                var defer = $q.defer();

                $http({
                    method: 'GET',
                    url: path
                }).success(function(data) {
                    translate = data;

                    defer.resolve(data);
                }).error(function(data, status) {
                    defer.reject({data: data, status: status});
                });

                return defer.promise;
            }
        }]);
})();
