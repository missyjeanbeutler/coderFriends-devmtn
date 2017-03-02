angular.module('app', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('', '/');

    $stateProvider
        .state('splash', {
            url: '/',
            templateUrl: '/templates/splash.html'
        })
        .state('login', {
            url: '/auth/github',
            templateUrl: '/templates/login.html'
        })
        .state('home', {
            url: '/home',
            templateUrl: '/templates/home.html',
            controller: 'homeCtrl'
        })
        .state('friend', {
            url: '/friend/:username',
            templateUrl: '/templates/friend.html'
        })

    $urlRouterProvider.otherwise('/');




}).config(function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.interceptors.push('myHttpInterceptor');
});

// register the interceptor as a service
app.factory('myHttpInterceptor', function($q) {
    return {
        // optional method
        'responseError': function(rejection) {
            if (rejection.status == 403) {
                document.location = '/';
                return;
            }
            return $q.reject(rejection);
        }
    };
});