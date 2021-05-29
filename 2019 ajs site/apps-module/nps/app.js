'use strict';
var nps = angular.module('app', [
	'ngRoute',
	'ngTouch',
	'ngAnimate'
]);
nps.config(function ($locationProvider, $routeProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	// $locationProvider.hashPrefix('#');
	$routeProvider
		.when('/', {
			templateUrl: '../apps/nps/shared/pages/home.html',
		})
		.when('/home', {
			templateUrl: '../apps/nps/shared/pages/home.html',
		})
		.when('/article', {
			templateUrl: '../apps/nps/shared/pages/article.html',
		})
		.when('/park', {
			templateUrl: '../apps/nps/shared/pages/park.html',
		})
		.otherwise({
			redirectTo: '/'
		});
});