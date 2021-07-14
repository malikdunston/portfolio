(function(){

	let projects = angular.module(
	"projects", [
	]);

	projects.component("projects", {
		templateUrl: "projects/projects.html",
		controller: "projectsCtrl",
		controllerAs: "projects"
	});

	projects.controller("projectsCtrl", function($scope, $state, $wp, $transitions){
	var projects = this;
	projects.app = $scope.$parent.app;




	// data for the project boxes
		projects.allProj = [];
		$wp.getAllProjects(function(data){
			console.log(data);
			for (var x = 0; x < data.length; x++){

				let project = {};

				project.slug = data[x].slug,
				project.Title = data[x].title.rendered,
				project.subTitle = "Subtitles are Cool.",
				project.cover = data[x].acf.cover,
				project.skills = {
					web: [],
					design: [],
					brand: [],
					product: [],
				},
				project.tools = {
					web: [],
					design: [],
					brand: [],
					product: [],
				}


				if (data[x].parent == 0){
					// let datum = data[x];
					$wp.getProject({parent: data[x].id}, function(response){
						for (var i = 0; i < response.length; i++){
							
							let web = response[i].acf.web_skills;
							for (x in web){
								let skill = web[x];
								if (project.skills.web.indexOf(skill) == -1){
									project.skills.web.push(skill);
								}
							}
							let design = response[i].acf.design_skills;
							for (x in design){
								let skill = design[x];
								if (project.skills.design.indexOf(skill) == -1){
									project.skills.design.push(skill);
								}
							}
							let brand = response[i].acf.brand_skills;
							for (x in brand){
								let skill = brand[x];
								if (project.skills.brand.indexOf(skill) == -1){
									project.skills.brand.push(skill);
								}
							}
							let product = response[i].acf.product_skills;
							for (x in product){
								let skill = product[x];
								if (project.skills.product.indexOf(skill) == -1){
									project.skills.product.push(skill);
								}
							}

						}
					});
					if(data[x].slug == 'web-development'){
						project.skills = {
							web: data[x].acf.web_skills,
							design: data[x].acf.design_skills,
							brand: data[x].acf.brand_skills,
							product: data[x].acf.product_skills,
						}
					}
					
					
					var dontShow = ['web-development']
					if (dontShow.indexOf(project.slug) == -1){
						projects.allProj.push(project);
					} else{
						console.log(project);
						projects.webdev = project;
					}
				}
			
			}

		});


		// var x = projects.allProj;

	// projects functionality
		projects.app.projClicker = false;
		projects.app.formPeek = false;
		projects.app.welcomeHeader = false;

		projects.onHover = function(x){
			projects.app.formPeek = true;
			$("#projects > ." + x.slug).addClass("proj-hover");
			$("#projects > *:not(." + x.slug + ")").addClass("proj-bg");

		// take the 

			projects.holdSubTitle = projects.app.pageSubTitle;
			projects.holdTitle = projects.app.pageTitle;
			projects.app.menuPeek = true;
			projects.app.ticker = x.Title;
			projects.app.pageTitle = x.Title;
			projects.app.pageSubTitle = x.Title;

			projects.app.welcomeHeader = true;
			// console.log(projects.app.welcomeHeader);
			// projects.holdTitle = projects.app.pageTitle;
			// console.log(projects.holdSubTitle);
		}

		projects.offHover = function(){
			projects.app.formPeek = false;
			$("#projects").children().removeClass("proj-hover proj-bg");
			// if (projects.app.state.to !== "casestudy"){
				projects.app.menuPeek = false;
				// console.log("hey")
			// }
			// if(projects.app.state.to == "casestudy"){
				// alert("wassup");
			// }
			projects.app.pageSubTitle = projects.holdSubTitle;
			projects.app.pageTitle = projects.holdTitle;
			// console.log(projects.app.pageSubTitle);
			projects.app.welcomeHeader = false;
			// console.log(projects.app.welcomeHeader);
		}

		projects.projClick = function(name) {
			if (projects.app.viewtype == "xs" || projects.app.viewtype == "sm"){
				$("#projects > *." + name).siblings().toggleClass("proj-hide");
				if( projects.app.projClicker == false ) {
					projects.app.projClicker = true;
					projects.app.formPeek = true;
					$("contact-form").addClass("hidden");
				}else {
					projects.app.projClicker = false;
					projects.app.formPeek = false;
					$("contact-form").removeClass("hidden");
				}
			}else if (name == "web-development") {
				$state.go('apps');
			}else{
				$state.go('casestudy', {name: name});
			}
		}


		$transitions.onSuccess({}, function($transition){
			if (projects.app.state.to == "casestudy"){
				projects.app.pageClass = "casestudy";
				$wp.getAllProjects(function(data){
					for (x in data){
						if (data[x].slug == $transition.params().name){
							console.log(data[x].title.rendered);
							projects.app.pageTitle = data[x].title.rendered;
							projects.app.pageSubTitle = "Malik Dunston";
						}
					}
				});
			}
		});

	// for web dev project
		// projects.

	});
})();