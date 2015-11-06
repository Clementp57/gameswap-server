var app = angular.module('GameSwapPlatform', ['ngRoute', 'ngResource']);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'templates/login.html',
			controller: 'LoginController'
		})
		.when('/annoncements', {
			templateUrl: 'templates/ancmts.html',
			controller: 'AncmtsController'
		})
		.when('/events', {
			templateUrl: 'templates/events.html',
			controller: 'EventsController'
		});

		$routeProvider.otherwise({
			redirectTo: '/annoncements'
		});
	}
]);

app.factory('AnnoncementService', function($window, $resource) {
	var ancmtEndPoint = 'http://emm-project3.herokuapp.com/api/v1/annoncements/pendings/:id';

    return $resource(ancmtEndPoint);
});

app.factory('EventService', function($window, $resource) {
	var ancmtEndPoint = 'http://emm-project3.herokuapp.com/api/v1/events/pendings/:id';

    return $resource(ancmtEndPoint);
});

app.controller('NavController', function($location, $scope) {
	$scope.getClass = function (path) {
	  if ($location.path().indexOf(path) != -1) {
	    return 'active';
	  } else {
	    return '';
	  }
	}
}).controller('LoginController', function($scope, $http, $window, $location) {
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
}).controller('AncmtsController', function(AnnoncementService, $http, $window, $scope) {
	$http.defaults.headers.common['x-access-token']= $window.localStorage.server_token;
	$http.defaults.headers.common['x-admin']= true;
	AnnoncementService.query().$promise.then(function(data) {
		$scope.ancmts = data;
	});

	$scope.validate = function(id) {
		$http.post('http://emm-project3.herokuapp.com/api/v1/annoncements/'+id+'/validate').success(function() {
			removeAncmt(id);
		});
	};

	$scope.revoke = function(id, reason) {
		$http.post('http://emm-project3.herokuapp.com/api/v1/annoncements/'+id+'/revoke?reason='+reason).success(function() {
			removeAncmt(id);
		});
	}

	var removeAncmt = function(id) {
		for(var i=0; i< $scope.ancmts.length; i++){
			if($scope.ancmts[i]._id == id) {
				delete $scope.ancmts[i];
				break;
			}
		} 
	}

}).controller('EventsController', function(EventService, $http, $window, $scope) {
	$http.defaults.headers.common['x-access-token']= $window.localStorage.server_token;
	$http.defaults.headers.common['x-admin']= true;
	EventService.query().$promise.then(function(data) {
		console.log(data);
		$scope.events = data;
	});

	$scope.validate = function(id) {
		$http.post('http://emm-project3.herokuapp.com/api/v1/events/'+id+'/validate').success(function() {
			removeEvent(id);
		});
	};

	$scope.revoke = function(id, reason) {
		$http.post('http://emm-project3.herokuapp.com/api/v1/events/'+id+'/revoke?reason='+reason).success(function() {
			removeEvent(id);
		});
	}

	var removeEvent = function(id) {
		for(var i=0; i< $scope.events.length; i++){
			if($scope.events[i]._id == id) {
				delete $scope.events[i];
				break;
			}
		} 
	}

});