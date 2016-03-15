(function() {
    angular
        .module('Translate')
        .filter('translate', ['localeResource', translateFilter]);

    ///////////////

    function translateFilter(localeResource) {
        return function(input) {
            return (localeResource.getTranslate() !== undefined && localeResource.getTranslate()[input] !== undefined) ? localeResource.getTranslate()[input] : input;
        }
    }
})();
