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
		navOpen: false,
		allProjects: []
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
	return {
		id: proj.id,
		slug: proj.slug,
		title: proj.title.rendered,
		skills: findSkillsTools(proj, "skills"),
		tools: findSkillsTools(proj, "tools"),
	// acf stuff...
		year: proj.acf.year,
		cover: proj.acf.cover,
		about: proj.acf.about,
	// stuff not needed on homepage...
		content: getContentFromChildren(proj),
	};

// make all projects like outernets!!!!!!
// no need to put html code in the wp content box.
// moved beyond that!!!
	function getContentFromChildren(proj){
		let body = [];
		proj.children.forEach(c => {
			let html = document.createElement("div");
			html.innerHTML = c.content.rendered;
			body.push({
				text: {
					title: c.title.rendered,
					desc: c.acf.description
				},
				images: html.querySelectorAll("figure img")
			})
		})
		return body;
	}
	function findSkillsTools(proj, str){
		let obj = {},
			fields = Object.keys(proj.acf).filter(k => k.endsWith(str)),
			types = fields.map(f => f.split("_")[0])
		fields.forEach((field, i) => {
			obj[types[i]] = proj.acf[field];
		})
		return obj
	}
};
componentDidMount(){
	this.getData(
		"projects",
		undefined,
		(projects) => {
			let parents = projects.filter(proj => proj.parent == 0);
			let children = projects.filter(proj => proj.parent !== 0);
			parents = parents.map(par => {
				return {
					...par,
					children: children.filter(child => child.parent == par.id)
				}
			})
			this.setState({
				allProjects: parents.map((proj) => {
					return this.constructProject(proj)
				})
			}, ()=>console.log("state", this.state.allProjects));
		}
	)
}
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
						allProjects={this.state.allProjects}
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
							allProjects={this.state.allProjects}
							getData={this.getData}
							constructProject={this.constructProject} />
					</div>
				)} />
			{/* <Contact /> */}
		</div>
	</Router>);
};
}; export default App;