(function(){

	let contact = angular.module(
	"contact", [
		"ui.router"
	]);

	contact.config(function($stateProvider){
	$stateProvider.state(
	'contact', {
		url: '/contact',
		templateUrl: 'contact-page/contact.html',
		controller: "contactCtrl",
		controllerAs: "contact"
	})});

	contact.component("contactForm", {
		templateUrl: "contact-page/contact-form.html",
		controller: "contactCtrl",
		controllerAs: "contact"
	});

	contact.controller("contactCtrl", function($scope, $http){
	var contact = this;
	contact.app = $scope.$parent.app;

		// console.log(contact.app.formPeek);

		contact.submit = function(){
			console.log(contact.user);
		}

		contact.error = "";
		contact.register = function(user){
			$http.post("submit.php", {
				'firstname': contact.user.firstname,
				'lastname': contact.user.lastname,
				'phone': contact.user.phone,
				'email': contact.user.email,
				'resume': contact.user.resume,
				'needs': contact.user.needs,
			}).then( function(data, status, headers, config){
				alert("Thank you, " + contact.user.firstname);
				console.log(contact.user);
				window.location.href = "http://malikdunston.com"
			}, function(data, status, headers, config){
				switch(status){
					case "404":
						contact.error = "404";
						alert(contact.error);
						// break;
					case "405":
						contact.error = "405";
						alert(contact.error);
						// break;
					case "403":
						contact.error = "403";
						alert(contact.error);
						// break;
					case "500":
						contact.error = "500";
						alert(contact.error);
						// break;
				}
			});
		};

	});

})();