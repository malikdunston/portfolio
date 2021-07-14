(function(){

	let app = angular.module(
	"malikdunston", [
		'ngTouch',
		'ngAnimate',
	// from hendricks
		"ui.router",
		"ngScroll",
		"ngSanitize",
	// my modules
		"wpdata",
	// states
		"navigation",
		"home",
		"projects",
		"casestudy",
		"about",
		"skills",
		"contact",
	// labs
		"labs",
		"todo",
		"game",
		// "social"
	]);

	app.config(function($locationProvider, $urlRouterProvider){
	        $locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise("/");
	});

	app.controller("appCtrl", function($transitions, $scope){
	var app = this;

		app.menu = [
			{
				slug: 'home',
				title: "Work",
				ticker: [
					"Malik Dunston",
					"Web + Design"
				]
			},
			{
				slug: 'about',
				title: "About",
				ticker: [
					"Malik Dunston",
					"Malik Dunston"
				]
			},
			{
				slug: 'skills',
				title: "Skills",
				ticker: [
					"Skills & Tools",
					"Malik Dunston"
				]
			},
			{
				slug: 'contact',
				title: "Contact",
				ticker: [
					"Malik Dunston",
					"Malik Dunston"
				]
			}, 
			{
				slug: 'apps',
				title: "Apps",
				ticker: [
					"Malik Dunston",
					"Apps"
				]
			}
		];

		app.menuLimit = 3;

	// transitions
		$transitions.onSuccess({}, function($transition){
			app.state = {};
			app.state.from = $transition.$from().name;
			app.state.to = $transition.$to().name;
			app.state.params = $transition.params().name;

			if (app.state.to == "casestudy"){
				app.caseStudyName = app.state.params;
				app.pageClass = "casestudy";
				console.log(app.caseStudyName);
			} else{
				app.pageClass = app.state.to;
				for(i in app.menu){
					if(app.menu[i].slug === app.state.to){
						app.pageTitle = app.menu[i].ticker[0];
						app.pageSubTitle = app.menu[i].ticker[1];
					}
				}				
				// app.pageTitle = app.menu[app.state.to][0] || app.state.to;
			}

			console.log(app.state.from);

			app.ticker = app.pageTitle;

			app.menuPeek = true;

			if(app.state.to == "home"){
				app.menuOpen = function(){
					setTimeout( function(){
						app.menuPeek = true;
					}, 20);
					if(app.state.to !== "casestudy"){
						setTimeout( function(){
							app.menuPeek = false;
						}, 10020);
					}
				}
				app.menuOpen();
			}
		});

	// switch between "Malik Dunston" and "Web + Design "
		app.tickerToggle = setInterval(function () {
			if (app.ticker == app.pageTitle){
				app.ticker = app.pageSubTitle;
			} else{
				app.ticker = app.pageTitle
			}
			$scope.$apply()
		}, 1333);

	// breakpoints
		app.breakpoints = function(w){
			if( w <= 400 ){
				app.viewtype = "xs"
			} else if( 400 <= w && w <= 1000 ){
				app.viewtype = "sm"
			} else if( 1000 <= w && w <= 1360 ){
				app.viewtype = "md"
			} else if( 1360 <= w && w <= 1900 ){
				app.viewtype = "lg"
			} else{
				app.viewtype = "xl"
			}
			return app.viewtype
		}
		app.breakpoints(window.innerWidth);
		window.addEventListener('resize', function () {
			app.breakpoints(window.innerWidth);
			console.log(app.viewtype);
		}, false);
	});

})();