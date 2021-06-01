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
		allProjects: [],
		currentProject: null
	}
	this.getData = this.getData.bind(this);
	this.constructProject = this.constructProject.bind(this);
	this.navToggle = this.navToggle.bind(this);
	this.select = this.select.bind(this);
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
			ext = "projects?per_page=100&parent=" + params
			break
		case "pages":
			ext = "pages?per_page=100"
			break
		case "apps":
			ext = "apps?per_page=100"
			break
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
		year: proj.acf.year,
		cover: proj.acf.cover,
		about: proj.acf.about,
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
select = (project) => (ev) => {
	let thisProj = ev.currentTarget,
		siblingProjs = thisProj.parentNode.querySelectorAll(":scope > *:not(." + project.slug + ")");
	switch (ev.type){
		case "touchstart":
			thisProj.classList.add("proj-hover")
			siblingProjs.forEach(proj => proj.classList.add("proj-bg"))
			break;
		case "click":
			if(this.state.currentProject){
				this.setState({currentProject: null}, ()=>console.log(this.state.currentProject))
			}else{
				this.setState({currentProject: project}, ()=>console.log(this.state.currentProject))
			}
			thisProj.classList.toggle("clicked");
			siblingProjs.forEach(proj => proj.classList.toggle("proj-hide"))
			break;
		case "touchend":
			thisProj.classList.remove("proj-hover")
			siblingProjs.forEach(proj => proj.classList.remove("proj-bg"))
			break;
	}
}
componentDidMount(){
	this.getData("projects", 0, (projects) => {
		this.setState({
			allProjects: projects.map((proj) => {
				return this.constructProject(proj)
			})
		}, ()=>console.log("state", this.state.allProjects));
	})
}
render() {
	return (<Router>
		<div className={this.state.navOpen ? "App navOpen" : "App"}>
			<Navigation
				toggleNav={this.navToggle}
				navOpen={this.state.navOpen} />
			<Route
				path="/work/:projectName"
				render={(thisRoute) => (
					<div>
						<div>
							as;dlkfja;sldkfja;sldkfja;sdlkfja;sl
						</div>


						{/* <Casestudy
							thisRoute={thisRoute}
							getData={this.getData}
							constructProject={this.constructProject} /> */}
						{/* <Projects
							currentProject={this.state.currentProject}
							select={this.select}
							allProjects={this.state.allProjects}
							getData={this.getData}
							constructProject={this.constructProject} /> */}
					</div>
				)} />
			{/* <Route
				exact
				path="/"
				render={() => ( */}
					<Projects
						currentProject={this.state.currentProject}
						select={this.select}
						allProjects={this.state.allProjects}
						getData={this.getData}
						constructProject={this.constructProject} />
				{/* )} /> */}
			{/* <Contact /> */}
		</div>
	</Router>);
};
}; export default App;
