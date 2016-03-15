(function() {
    angular
        .module('Blog')
        .factory('news', ['$q', '$http', newsService]);

    ///////////////

    function newsService($q, $http) {
        return {
            get: get
        };

        ///////////////

        function get() {
            var defer = $q.defer();

            $http({
                    method: 'GET',
                    url: '/data/news.json'
                }).success(function(data) {
                    defer.resolve(data);
                }).error(function(data, status) {
                    defer.reject({data: data, status: status});
                });

            return defer.promise;
        }
    }
})();
