(function() {
    angular
        .module('Blog')
        .factory('article', ['$q', '$http', articleService]);

    ///////////////

    function articleService($q, $http) {
        return {
            get: get
        };

        ///////////////

        function get(id) {
            var defer = $q.defer();

            $http({
                    method: 'GET',
                    url: '/data/articles.json'
                }).success(function(data) {
                    var results = data;

                    if(id && !isNaN(id)) {
                        for(var k in data) {
                            if(parseInt(id) == data[k].id)
                                results = data[k];
                        }
                    }

                    defer.resolve(results);
                }).error(function(data, status) {
                    defer.reject({data: data, status: status});
                });

            return defer.promise;
        }
    }
})();
