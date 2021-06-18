import { Component } from "react";
	import "./assets/webfonts/webfonts.css";
	import "./assets/css/normalize.css";
	import "./assets/css/index.min.css";
	import {Route} from "react-router-dom";
	import Navigation from "./components/navigation.js";
	import Projects from "./components/projects/projects.js";
	import Casestudy from "./components/projects/case-study.js";
	import Contact from "./components/contact/contact.js";
	import Modal from "./components/Modal.js";
class App extends Component {
constructor() {
	super();
	this.state = {
		navOpen: false,
		allProjects: [],
		currentProject: null,
		isProjOpen: false,
		contact: {
			isOpen: true,
			firstname: ""
		},
		lightMode: false,
		modalData: { // this for loading indicator too....
			isOpen: false,
			clickThrough: false, 
			content: "hello....",
			callback: null,
			action: "close" 
		}
	}
	this.getData = this.getData.bind(this);
	this.constructProject = this.constructProject.bind(this);
	this.navToggle = this.navToggle.bind(this);
	this.select = this.select.bind(this);
	this.lightModeOnOff = this.lightModeOnOff.bind(this);
	this.addUser = this.addUser.bind(this);
	this.modalToggle = this.modalToggle.bind(this);
};
modalToggle(bool, content, action, callback){
	this.setState({
		modalData: {
			...this.state.modalData,
			isOpen: bool,
			content: content,
			callback: callback,
			action: action
		}
	})
}
addUser(data){
	this.setState({
		userData: data
	})
}
navToggle(){
	this.setState({
		navOpen: !this.state.navOpen,
	})
};
getData(type, params, callback) {
	let url = "https://wp.malikdunston.com/wp-json/wp/v2/", ext;
	switch (type) {
		case "projects":
			ext = "projects?per_page=100" + params
			break
		case "pages":
			ext = "pages?per_page=100"
			break
		case "apps":
			ext = "apps?per_page=100"
			break
		default:
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
		parent: proj.parent,
		slug: proj.slug,
		title: proj.title.rendered,
		skills: findSkillsTools(proj, "skills"),
		tools: findSkillsTools(proj, "tools"),
		year: proj.acf.year,
		cover: proj.acf.cover,
		about: proj.acf.about,
		body: getContentFromChildren(proj)
	};
	function findSkillsTools(proj, str){
		let obj = {},
			fields = Object.keys(proj.acf).filter(k => k.endsWith(str)),
			types = fields.map(f => f.split("_")[0])
		fields.forEach((field, i) => {
			obj[types[i]] = proj.acf[field];
		})
		return obj
	}
	function getContentFromChildren(proj){
		if(proj.parent > 0){
			return {
				text: {
					title: proj.title.rendered,
					desc: proj.acf.about
				},
				images: findImages(proj)
			}
		}
	}
	function findImages(proj){
		let html = document.createElement("div");
		html.innerHTML = proj.content.rendered;
		return [...html.querySelectorAll("figure")].map(fig=>{
			let img = {
				src: fig.querySelector("img").src,
			}
			fig.querySelector("figcaption") ? img.caption = fig.querySelector("figcaption").textContent : img.caption = null
			return img
		})
	}
};
select = (project) => (ev) => {
	let thisProj = ev.currentTarget,
		siblingProjs = thisProj.parentNode.querySelectorAll(":scope > *:not(." + project.slug + ")");
	switch (ev.type){
		case "click":
			if(window.innerWidth > 1000){
				window.location.href = `${process.env.PUBLIC_URL}/work/${project.slug}`;
			}else{
				this.setState({
					isProjOpen: !this.state.isProjOpen,
					currentProject: project
				})
				thisProj.classList.toggle("clicked");
				siblingProjs.forEach(proj => proj.classList.toggle("proj-hide"))
			}
			break;
		case "touchstart":
			setTimeout(()=>{
				thisProj.classList.add("proj-hover")
				siblingProjs.forEach(proj => proj.classList.add("proj-bg"))
			}, 100)
			break;
		case "touchend":
			setTimeout(()=>{
				thisProj.classList.remove("proj-hover")
				siblingProjs.forEach(proj => proj.classList.remove("proj-bg"))
			}, 100)
			break;
		case "mouseenter":
			if(ev.target.classList.contains("proj-title") || ev.target.classList.contains("proj-img")){
				setTimeout(()=>{
					thisProj.classList.add("proj-hover")
					siblingProjs.forEach(proj => proj.classList.add("proj-bg"))
				}, 100)
			}
			break;
		case "mouseleave":
			setTimeout(()=>{
				thisProj.classList.remove("proj-hover")
				siblingProjs.forEach(proj => proj.classList.remove("proj-bg"))
			}, 100)
			break;
		default:
			break;
	}
}
componentDidMount(){
	this.getData("projects", "&parent=0", (projects) => {
		this.setState({
			allProjects: projects.map((proj) => {
				return this.constructProject(proj)
			})
		});
	})
	this.lightModeOnOff(this.state.lightMode)();
}
lightModeOnOff = (bool) => (ev) => {
	if(bool){
		this.setState({
			lightMode: bool
		})
	} else {
		this.setState({
			lightMode: !this.state.lightMode
		})
	}
	this.state.lightMode
		? document.body.classList.add("lightmode")
		: document.body.classList.remove("lightmode");
}
render() {
	return (
		<div className={"App" + (this.state.navOpen ? " navOpen" : "")}>
			<Navigation
				lightModeOnOff={this.lightModeOnOff} 
				toggleNav={this.navToggle}
				navOpen={this.state.navOpen} />
			<Route
				path="/work/:projectName"
				render={(props) => (
					<div id="casestudy">
						<Casestudy 
							modalToggle={this.modalToggle}
							{...props}
							getData={this.getData}
							constructProject={this.constructProject}/>
						<Projects
							isProjOpen={this.state.isProjOpen}
							currentProject={this.state.currentProject}
							select={this.select}
							allProjects={this.state.allProjects}
							getData={this.getData}
							constructProject={this.constructProject} />
					</div>
				)} />
			<Route
				exact path="/contact"
				render={() => (
					<Contact
						modalToggle={this.modalToggle}
						addUser={this.addUser}
						lightModeOnOff={this.lightModeOnOff} 
						firstname={this.state.contact.firstname}/>
				)} />
			<Route
				exact path="/"
				render={() => (
					<div id="home">
						<div id="homepage">
							<h3>Malik Dunston</h3>
							<p>Web + Design 👍🏿</p>
						</div>
						<Projects
							isProjOpen={this.state.isProjOpen}
							currentProject={this.state.currentProject}
							select={this.select}
							allProjects={this.state.allProjects}
							getData={this.getData}
							constructProject={this.constructProject} />
					</div>
				)} />
			<Modal
				toggle={this.modalToggle}
				data={this.state.modalData}/>
		</div>
	);
};
}; export default App;