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
		navOpen: false
	}
	this.getData = this.getData.bind(this);
	this.constructProject = this.constructProject.bind(this);
	this.navToggle = this.navToggle.bind(this);
};
navToggle(){
	this.setState({
		navOpen: !this.state.navOpen
	})
};
getData(type, params, callback) {
// need to cache proj responses for an hour to optimize performance
	let url = "http://wp.malikdunston.com/wp-json/wp/v2/", ext;
	switch (type) {
		case "projects":
			ext = "projects?per_page=100"
			break
		case "pages":
			ext = "pages?per_page=100"
			break
		case "apps":
			ext = "apps?per_page=100"
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
	let html = document.createElement("div");
	html.innerHTML = proj.content.rendered;
	let projObj = {
		id: proj.id,
		slug: proj.slug,
		title: proj.title.rendered,
		content: proj.content.renered,
		images: [...html.querySelectorAll("figure img")],
		...proj.acf,
		skills: findSkillsTools(proj, "skills"),
		tools: findSkillsTools(proj, "tools"),
	};

	console.log(proj.acf);
	return projObj;

	function findSkillsTools(proj, skillsTools){
		let obj = {};
		let fields = Object.keys(proj.acf)
			.filter(keyName => keyName.endsWith(skillsTools))
		let types = fields.map(f => f.split("_")[0])
		fields.forEach((field, i) => {
			obj[types[i]] = proj.acf[field];
		})
		return obj
	}
};
render() {
	return (<Router>
		<div className={this.state.navOpen ? "App navOpen" : "App"}>
			<Navigation
				toggleNav={this.navToggle}
				navOpen={this.state.navOpen} />
			<Route
				exact
				path="/"
				render={() => (
					<Projects
						getData={this.getData}
						constructProject={this.constructProject} />
				)} />
			<Route
				path="/work/:projectName"
				render={(thisRoute) => (
					<div>
						<Casestudy
							thisRoute={thisRoute}
							getThisProject={this.getData}
							constructProject={this.constructProject} />
						<Projects
							getData={this.getData}
							constructProject={this.constructProject} />
					</div>
				)} />
			{/* <Contact /> */}
		</div>
	</Router>);
};
}; export default App;