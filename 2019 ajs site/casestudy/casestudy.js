(function(){

	let casestudy = angular.module(
	"casestudy", [
	]);

	casestudy.config(function($stateProvider){
	$stateProvider.state(
	'casestudy', {
		url: '/work/:name',
		templateUrl: '/casestudy/case-study.html',
		controller: "casestudyCtrl",
		controllerAs: "casestudy"
	})});

	casestudy.controller("casestudyCtrl", function($scope, $stateParams, $wp){
	var casestudy = this;
	casestudy.app = $scope.$parent.app;


		// alert("hey");
	// fill the page
		casestudy.page = {};
		$wp.getProject({slug: $stateParams.name}, function(data){
			casestudy.page.rendered = data[0].content.rendered;
		// adv custom fields plugin
			casestudy.page.columns = {};
				casestudy.page.columns.about = data[0].acf.about;
				casestudy.page.columns.goals = data[0].acf.goals;
				casestudy.page.columns.seen = data[0].acf.seen;
				casestudy.page.columns.findings = data[0].acf.findings;
				casestudy.page.columns.more = data[0].acf.more;

			// casestudy.page.id = data[0].id;
			console.log("page id: " + data[0].id);

			$wp.getProject({parent: data[0].id}, function(response){

				casestudy.posts = []
				for (i in response){
					// casestudy.posts = {};
					var x = response[i];
					casestudy.posts.push(x);
				}
				
				casestudy.ex = ["Hello", "Goodbye"];
					console.log(casestudy.posts);

			});


		});


	// open the menu after a few seconds.
		setTimeout(function(){
			casestudy.app.menuPeek = true;
			console.log(casestudy.app.menuPeek);
		}, 6000);



		casestudy.app.formPeek = true;
		casestudy.contentOnOff = false;

		$(window).scroll(function () {
			var topOffset = $(window).scrollTop() + $(window).height();
			var docHeight = $(document).height();
			var winHeight = $(window).height();
			var btmOffset = docHeight - winHeight;

				// $scope.$apply();
				// console.log(topOffset, docHeight, winHeight);

				if(topOffset > btmOffset){
					casestudy.contentOnOff = true;
					casestudy.app.menuPeek = true;
					// casestudy.app.navPeek = true;
				} else{
					casestudy.contentOnOff = false;
				}
			// console.log(casestudy.contentOnOff);
		});


	});

})();