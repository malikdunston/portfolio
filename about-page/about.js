(function(){

	let about = angular.module(
	"about", [
		"ui.router",
		"wpdata"
	]);

	about.config(function($stateProvider){
	$stateProvider.state(
	'about', {
		url: '/about',
		templateUrl: '/about-page/about.html',
		controller: "aboutCtrl",
		controllerAs: "about"
	})});

	about.controller("aboutCtrl", function($scope, $wp){
	var about = this;
	about.app = $scope.$parent.app;

		console.log(about.pageContent);

		$wp.getPage({slug: "about"}, function(data){
			console.log(data[0]);
		// I want to create a generic html element here, then 
			about.pageContent = data[0].content.rendered;
		});

	// open the menu after a few seconds.
		setTimeout(function(){
			about.app.menuPeek = true;
			console.log(about.app.menuPeek);
		}, 4000);

	});

})();