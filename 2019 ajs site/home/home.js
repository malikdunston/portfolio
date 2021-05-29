(function(){

	let home = angular.module(
	"home", [
		"ui.router"
	]);

	home.config(function($stateProvider){
	$stateProvider.state(
	'home', {
		url: '/',
		templateUrl: '/home/home.html',
		controller: "appCtrl",
		controllerAs: "home"
	})});

})();