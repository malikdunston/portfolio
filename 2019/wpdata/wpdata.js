(function () {

	let wpService = angular.module(
	'wpdata', []);

	wpService.service(
	'$wp', function ($http) {
	const api = 'https://blog.malikdunston.com/wp-json/';
	var wp = this;


	// about, etcmalik@malikdunston.com	
		wp.getPage = function (param, callback) {
			var pages = "wp/v2/pages"
			$http({
				url: api + pages,
				method: 'GET',
				params: param
			}).then(function (response) {
			// success!
				if (typeof callback === "function") {
					callback(response.data);
				};
			}, function (response) {				
				alert('$wp getPage failed.');
			});
		};

		wp.getAllProjects = function(callback) {
			var projects = "wp/v2/projects";
			$http({
				url: api + projects,
				method: 'GET',
				params: {
					per_page: 100
				}
			}).then(function (response) {
			// success!
				if (typeof callback === "function") {
					callback(response.data);
				};
			}, function (response) {				
				alert('$wp getAllProjects failed.');
			});
		}

		wp.getProject = function(param, callback) {
			var projects = "wp/v2/projects";
			$http({
				url: api + projects,
				method: 'GET',
				params: param
			}).then(function (response) {
			// success!
				if (typeof callback === "function") {
					callback(response.data);
				};
			}, function (response) {				
				alert('$wp getProject failed.');
			});
		}
		
		wp.getField = function (param, callback) {
			var acf = "acf/v3/projects/"
			
			
			$http({
				url: api + acf,
				method: 'GET',
				params: param
			}).then(function (response) {
			// success!
				if (typeof callback === "function") {
					callback(response.data);
				};
			}, function (response) {				
				alert('$wp getField failed.');
			});
		};

	// posts are just for the blog.
		wp.getPost = function (param, callback) {
			var posts = "wp/v2/posts"
			$http({
				url: api + posts,
				method: 'GET',
				params: param
			}).then(function (response) {
			// success!
				if (typeof callback === "function") {
					callback(response.data);
				};
			}, function (response) {				
				alert('$wp getPost failed.');
			});
		};

	// apps
		wp.getApps = function (param, callback) {
			var apps = "wp/v2/apps"
			$http({
				url: api + apps,
				method: 'GET',
				params: param
			}).then(function (response) {
			// success!
				if (typeof callback === "function") {
					callback(response.data);
				};
			}, function (response) {				
				alert('$wp getPost failed.');
			});
		};

	});

})();