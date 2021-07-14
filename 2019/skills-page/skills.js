(function(){

	let skills = angular.module(
	"skills", [
		"ui.router",
		"wpdata"
	]);

	skills.config(function($stateProvider){
	$stateProvider.state(
	'skills', {
		url: '/skills',
		templateUrl: '/skills-page/skills.html',
		controller: "skillsCtrl",
		controllerAs: "skillsTools"
	})});

	skills.controller("skillsCtrl", function($scope, $wp){
	var skillsTools = this;
	skillsTools.app = $scope.$parent.app;

		$wp.getPage({parent: 386}, function(data){
		// I want to create a generic html element here, then 
			
			for (x in data){
				data[x].skills = {
					web: data[x].acf.web_skills,
					design: data[x].acf.design_skills,
					brand: data[x].acf.brand_skills,
					product: data[x].acf.product_skills
				}
				data[x].tools = {
					web: data[x].acf.web_tools,
					design: data[x].acf.design_tools,
					brand: data[x].acf.brand_tools,
					product: data[x].acf.product_tools
				}
				console.log(x, data[x]);
			}
			skillsTools.pageContent = data;
			console.log(skillsTools);
			console.log(skillsTools.pageContent.tools);
		});

	});

})();