var app = angular.module('GameSwapPlatform', ['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
      });
      
      $routeProvider.otherwise({
        redirectTo: '/'
      });
  }]);

app.controller('LoginController', function() {
	console.log('yoyo');
});