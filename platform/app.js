var app = angular.module('GameSwapPlatform', ['ngRoute', 'ngResource']);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'templates/login.html',
			controller: 'LoginController'
		})
		.when('/home', {
			templateUrl: 'templates/home.html',
			controller: 'HomeController'
		});

		$routeProvider.otherwise({
			redirectTo: '/'
		});
	}
]);

app.factory('AnnoncementService', function($window, $resource) {
	var ancmtEndPoint = 'http://emm-project3.herokuapp.com/api/v1/annoncements/:id';

    return $resource(ancmtEndPoint, {
      get: { 
        method: 'GET',
        params: {id : 'id'},
        isArray: true,
        headers: { 
        	'x-access-token' : $window.localStorage.server_token,
        	'x-admin': true
        }
      },
     delete: {
        method: 'DELETE',
        params: {id : 'id'},
        isArray: true
      }
    });
});

app.controller('LoginController', function($scope, $http, $window, $location) {
	$scope.email = "";
	$scope.password = "";

	$scope.login = function() {

		var data = JSON.stringify({
			email: $scope.email,
			password: $scope.password
		});

		$http.post('/platform/login', data).success(function(response) {
			$window.localStorage.server_token = response.token;
			$window.localStorage.logged_user = JSON.stringify(response.user);
			$location.path('/home');
			console.log('redirected');
		}).error(function(error) {
			console.error('failed to log user : ', error);
		});
	}
}).controller('HomeController', function(AnnoncementService, $http, $window) {
	$http.defaults.headers.common['x-access-token']= $window.localStorage.server_token;
	$http.defaults.headers.common['x-admin']= true;
	AnnoncementService.query().$promise.then(function(data) {
		console.log(data);
	});

});