(function(){

	let labs = angular.module(
	"labs", [
	]);

	labs.config(function($stateProvider){
	$stateProvider.state(
	'apps', {
		url: '/apps',
		templateUrl: '/363-labs/labs-directory.html',
		controller: "labsCtrl",
		controllerAs: "labs"
	})});

	labs.controller("labsCtrl", function($scope, $stateParams, $state, $wp, $location){
	var labs = this;
	labs.app = $scope.$parent.app;

		labs.allLabs = [];
		$wp.getApps({}, function(data){
			for (var x = 0; x < data.length; x++){

				let app = {};

				app.slug = data[x].slug,
				app.Title = data[x].title.rendered,
				app.subTitle = "Subtitles are Cool.",
				app.cover = data[x].acf.cover,
				app.skills = {
					web: data[x].acf.web_skills,
					design: data[x].acf.design_skills,
					brand: data[x].acf.brand_skills,
					product: data[x].acf.product_skills,
				},
				app.tools = {
					web: data[x].acf.web_tools,
					design: data[x].acf.design_tools,
					brand: data[x].acf.brand_tools,
					product: data[x].acf.product_tools,
				},
				app.href = data[x].acf.href,
				app.uisref = data[x].acf.uisref


				if (data[x].parent == 0){
					let datum = data[x];

					// $wp.getProject({parent: data[x].id}, function(response){
					// 	for (var i = 0; i < response.length; i++){
							
							let web = response[i].acf.web_skills;
							for (x in web){
								let skill = web[x];
								if (app.skills.web.indexOf(skill) == -1){
									app.skills.web.push(skill);
								}
							}
							let design = response[i].acf.design_skills;
							for (x in design){
								let skill = design[x];
								if (app.skills.design.indexOf(skill) == -1){
									app.skills.design.push(skill);
								}
							}
							let brand = response[i].acf.brand_skills;
							for (x in brand){
								let skill = brand[x];
								if (app.skills.brand.indexOf(skill) == -1){
									app.skills.brand.push(skill);
								}
							}
							let product = response[i].acf.product_skills;
							for (x in product){
								let skill = product[x];
								if (app.skills.product.indexOf(skill) == -1){
									app.skills.product.push(skill);
								}
							}

					// 	}
					// });

				}
					labs.allLabs.push(app);
					// console.log(data[x]);

			}
			console.log(labs.allLabs);

		// functionality from projects
			labs.app.projClicker = false;

			labs.app.welcomeHeader = false;
			labs.app.formPeek = false;

			labs.onHover = function(x){
				labs.app.formPeek = true;
				$("body.apps ui-view > ." + x.slug).addClass("proj-hover");
				$("body.apps ui-view > *:not(." + x.slug + ")").addClass("proj-bg");

			// take the 

				labs.holdSubTitle = labs.app.pageSubTitle;
				labs.holdTitle = labs.app.pageTitle;
				labs.app.menuPeek = true;
				labs.app.ticker = x.Title;
				labs.app.pageTitle = x.Title;
				labs.app.pageSubTitle = x.Title;

				// labs.holdTitle = labs.app.pageTitle;
				// console.log(labs.holdSubTitle);
				labs.app.welcomeHeader = true;
				console.log(x);
			}

			labs.offHover = function(){
				labs.app.formPeek = false;
				$("body.apps ui-view").children().removeClass("proj-hover proj-bg");
				labs.app.menuPeek = false;
				labs.app.pageSubTitle = labs.holdSubTitle;
				labs.app.pageTitle = labs.holdTitle;
				// console.log(labs.app.pageSubTitle);
				labs.app.welcomeHeader = false;
			}

			labs.projClick = function(x) {
				if (labs.app.viewtype == "xs" || labs.app.viewtype == "sm"){
					$("body.apps ui-view > *." + x.slug).siblings().toggleClass("proj-hide");
					if( labs.app.projClicker == false ) {
						labs.app.projClicker = true;
						labs.app.formPeek = true;
						$("contact-form").addClass("hidden");
					}else {
						labs.app.projClicker = false;
						labs.app.formPeek = false;
						$("contact-form").removeClass("hidden");
					}
				}else{
					if( x.uisref !== "" ){
						$state.go( x.uisref );
					}
					else{  // href
						// var completeUrl = "http://malikdunston.com/apps-module/" + x.href
						// console.log(completeUrl);
						window.location.href = x.href;
						// alert(completeUrl);
						// document.location.reload();
					}
				}
			}

			labs.labClick = function(x) {

			}


		});
	});

})();