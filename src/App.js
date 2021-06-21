import { Component } from "react";
import "./assets/webfonts/webfonts.css";
import "./assets/css/normalize.css";
import "./assets/css/index.min.css";
import { Route, Link } from "react-router-dom";
import Navigation from "./components/navigation.js";
import Projects from "./components/projects/projects.js";
import Casestudy from "./components/projects/case-study.js";
import Contact from "./components/contact/contact.js";
import Modal from "./components/Modal.js";
class App extends Component {
	constructor() {
		super();
		this.state = {
			iterator: 0,
			navData: {
				tickerA: ["Malik Dunston", "Web + Design"]
			},
			allProjects: [],
			contact: {
				isOpen: true,
				firstname: ""
			},
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
		this.select = this.select.bind(this);
		this.modalToggle = this.modalToggle.bind(this);
		this.iterate = this.iterate.bind(this);
		this.navPeek = this.navPeek.bind(this);
	};
	componentDidMount() {
		this.getData("projects", "&parent=0", (projects) => {
			this.setState({
				allProjects: projects.map((proj) => {
					return this.constructProject(proj)
				})
			});
		})
		const navAnimation = setInterval(()=>{
			this.iterate(this.state.navData.tickerA.length);
		}, 1000)
	}

	iterate(len) {
		this.setState(prevState => {
			return { 
				iterator: prevState.iterator === (len - 1) ? 0 : prevState.iterator + 1 
			}
		});
	}
	navPeek(ev){
		switch(ev.type){
			case "mouseenter":
				this.state.navData.peeked = true;
				break;
			case "mouseleave":
				this.state.navData.peeked = false;
				break;
			case "click":
				this.state.navData.forced = false;
				this.state.navData.replace = false;
				this.state.navData.open = !this.state.navData.open;
				break;
			default:
				break;
		}
		this.setState({}, ()=>{
			if (this.state.navData.open) {this.state.navData.peeked = false};
			this.setState({})
		});
	}
	modalToggle(bool, content, action, callback) {
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
		function findSkillsTools(proj, str) {
			let obj = {},
				fields = Object.keys(proj.acf).filter(k => k.endsWith(str)),
				types = fields.map(f => f.split("_")[0])
			fields.forEach((field, i) => {
				obj[types[i]] = proj.acf[field];
			})
			return obj
		}
		function getContentFromChildren(proj) {
			if (proj.parent > 0) {
				return {
					text: {
						title: proj.title.rendered,
						desc: proj.acf.about
					},
					images: findImages(proj)
				}
			}
		}
		function findImages(proj) {
			let html = document.createElement("div");
			html.innerHTML = proj.content.rendered;
			return [...html.querySelectorAll("figure")].map(fig => {
				let img = {
					src: fig.querySelector("img").src,
				}
				fig.querySelector("figcaption") ? img.caption = fig.querySelector("figcaption").textContent : img.caption = null
				return img
			})
		}
	};
	select = (project) => (ev) => {
		switch (ev.type) {
			case "touchstart":
			case "mouseenter":
				project.selected = true;
				this.state.navData.tickerB = project.title;
				this.state.navData.replace = true;
				this.state.navData.peeked = true;
				break;
			case "touchend":
			case "mouseleave":
				if(project.clicked){
				}else{
					project.selected = false;
					this.state.navData.tickerB = project.title;
					this.state.navData.replace = false;
					this.state.navData.peeked = false;
				}
				break;
			case "click":
				if (window.innerWidth >= 1000) {
					window.location.href = `${process.env.PUBLIC_URL}/work/${project.slug}`
				} else {
					this.state.navData.forced = !this.state.navData.forced;
					project.clicked = !project.clicked;
					project.selected = (project.clicked ? true : false);
					this.state.navData.peeked = (project.clicked ? true : false);
					this.state.navData.replace = (project.clicked ? true : false);
				}
				break;
			default:
				break;
		}
		this.setState({
			currentProj: this.state.allProjects.filter(p => p.selected === true)[0]
		});
	}
	render() {
		return (
			<div className={"App"}>
				<Navigation
					i={this.state.iterator}
					data={this.state.navData}
					navPeek={this.navPeek} />
				<Route
					path="/work/:projectName"
					render={(props) => (
						<div id="casestudy">
							<Casestudy
								modalToggle={this.modalToggle}
								{...props}
								getData={this.getData}
								constructProject={this.constructProject} />
							<article>
								<section className="text">
									<div className="column">
										<h3>Browse More Projects</h3>
									</div>
								</section>
								<Projects
									currentProj={this.state.currentProj}
									select={this.select}
									allProjects={this.state.allProjects}
									getData={this.getData}
									constructProject={this.constructProject} />
							</article>
						</div>
					)} />
				<Route
					exact path="/contact"
					render={() => (
						<Contact
							modalToggle={this.modalToggle}
							firstname={this.state.contact.firstname} />
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
								currentProj={this.state.currentProj}
								select={this.select}
								allProjects={this.state.allProjects}
								getData={this.getData}
								constructProject={this.constructProject} />
							<div id="tocontact"
								className={this.state.currentProj ? "" : "peeked"}>
								<input type="text"
									placeholder="First Name"
									onChange={(ev) => { this.setState({ contact: { ...this.state.contact, firstname: ev.target.value } }) }} />
								<Link to="/contact">
									<div>Hello!</div>
								</Link>
							</div>
						</div>
					)} />
				<Modal
					toggle={this.modalToggle}
					data={this.state.modalData} />
			</div>
		);
	};
}; export default App;