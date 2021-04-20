import { Component } from "react";
	import "./assets/css/index.min.css";
	import {
		BrowserRouter as Router,
		Route,
	} from "react-router-dom";
	// components
	// app
	import Navigation from "./components/navigation.js";
	import Projects from "./components/projects/projects.js";
	// work/:projName
	import Casestudy from "./components/projects/case-study.js";
	// contact
	import Contact from "./components/contact/contact.js";

class App extends Component {
constructor() {
	super();
	this.state = {
		projects: [],
	}
	this.getData = this.getData.bind(this);
	this.constructProject = this.constructProject.bind(this);
};
getData(type, params, callback) {
	let url = "http://wp.malikdunston.com/wp-json/wp/v2/", ext;
	switch (type) {
		case "projects":
			ext = "projects"
			break
		case "pages":
			ext = "pages"
			break
		case "apps":
			ext = "apps"
			break
		case "casestudy":
			ext = "projects?slug=" + params
	};
	fetch(url + ext)
		.then(data => data.json())
		.then(projects => {
			callback(projects)
		});
};
constructProject(proj) {
// parse the proj.content.rendered html to json
	let html = document.createElement("div");
	html.innerHTML = proj.content.rendered;
	let images = html.querySelectorAll("figure img");
// new projobj with above...
	let projObj = {
		id: proj.id,
		slug: proj.slug,
		title: proj.title.rendered,
		content: proj.content.renered,
		images: [...images],
		...proj.acf
	};
	console.log(projObj);
	return projObj;
};
render() {
	return (<Router>
		<div className="App">
			<Navigation />
			{/* exact keeps the paths below from cascading and including
	the "/" stuff, PLUS anything wit "/" and additional stuff!!! */}
			<Route
				exact
				path="/"
				render={() => (
					<Projects
						getProjects={this.getData}
						constructProject={this.constructProject} />
				)} />
			{/* path prop can be deconstructed so we can include hashes */}
			<Route
				path="/work/:projectName"
				render={(thisRoute) => (
					<div>
						<Casestudy
							thisRoute={thisRoute}
							getThisProject={this.getData}
							constructProject={this.constructProject} />
						<Projects
							getProjects={this.getData}
							constructProject={this.constructProject} />
					</div>
				)} />
			<Contact />
		</div>
	</Router>);
};
}; export default App;