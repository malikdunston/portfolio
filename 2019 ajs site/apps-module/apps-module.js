(function(){

	let appsmodule = angular.module(
	"appsmodule", [
		"ui.router"
	]);

	appsmodule.config(function($stateProvider){
	$stateProvider.state(
	'appsmodule', {
		url: '/apps-module/:module',
		// templateUrl: '/home/home.html',
		controller: "appsmoduleCtrl",
		controllerAs: "appsmodule"
	})});

	app.controller("appsmoduleCtrl", function($transitions, $scope){
	var appsmodule = this;

		alert($stateParams.module);
	});


})();