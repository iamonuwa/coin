/**
* coin Module
*
* Coin Exchange Main Module
* All required angular dependency goes here.
*/
angular.module('coin', [
		'ui.router',
		'firebase'
	])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/');
	$locationProvider.hashPrefix('');

	$stateProvider
		.state('app', {
			abstract: true,
			templateUrl: 'views/templates/ui.templates.views.client.html',
		})
			.state('app.index', {
				url: '/',
				templateUrl: 'views/index.views.client.html',
				pageTitle: "Welcome to Coin Exchange",
			})
}])
.run(['$rootScope', '$location', function ($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function (evt, next, prev, err) {
		if(err === "AUTH_REQUIRED"){
			$location.path('/');
		}
	});
}])
