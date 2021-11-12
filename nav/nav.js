(function(){

	let nav = angular.module(
	"navigation", []);

	nav.component("navigation", {
		controller: "navCtrl",
		controllerAs: "nav",
		templateUrl: "nav/nav.html"
	});

	nav.controller("navCtrl", function($scope) {
	var nav = this;
	nav.app = $scope.$parent.app;
	
	});

})();