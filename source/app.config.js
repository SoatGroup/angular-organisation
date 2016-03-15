angular
    .module('Blog')
    .config(['$locationProvider', appConfig])
    .constant('config', constants());

///////////////

function appConfig($locationProvider) {
    //Use the HTML5 History API
    $locationProvider.html5Mode({
        enabled: true
    });
}

function constants() {
    return {
        dataPath: '/datas',
        defaultLocation: 'fr_FR',
        _langs: [
            {locale: 'fr_FR', lang: 'Français'}
        ]
    };
}
