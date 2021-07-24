import { Component } from "react";
	import "./assets/webfonts/webfonts.css";
	import "./assets/css/normalize.css";
	import "./assets/css/index.min.css";
	import { Route, Link, withRouter } from "react-router-dom";
	import Navigation from "./components/navigation.js";
	import Projects from "./components/projects/projects.js";
	import Casestudy from "./components/projects/case-study.js";
	import Contact from "./components/contact/contact.js";
	import Modal from "./components/Modal.js";
	import avatar from "./assets/images/avatar2.jpg";
class App extends Component {
	constructor() {
		super();
		this.state = {
			iterator: 0,
			navData: {
				tickerA: ["Malik Dunston", "Web + Design"],
				tickerB: ""
			},
			allProjects: [],
			contact: {
				isOpen: true,
				firstname: ""
			},
			modalData: {
				isOpen: false,
				persist: false,
				content: "hello....",
				callback: null,
				action: "close"
			},
			hiddenProjs: [
				["toolbox-no9-ux", ["a72b-toolbox", "maxxberkowitz", "josephmena"]], 
				["digital-signage", ["dstest"]]
			]
		}
		this.selectProj = this.selectProj.bind(this);
		this.modalToggle = this.modalToggle.bind(this);
		this.navPeek = this.navPeek.bind(this);
		this.openAbout = this.openAbout.bind(this);
		this.organizeProjects = this.organizeProjects.bind(this);
	};
	organizeProjects(data){
		data = data.map(d => {
			Object.assign(d, {
				...d.acf,
				tools: {
					web: d.acf.web_tools,
					design: d.acf.design_tools
				},
				text: {
					title: d.title.rendered,
					desc: d.acf.about
				},
				images: findImages(d)
			});
			delete d.acf;
			delete d.web_tools;
			delete d.design_tools;
			return d
		});
		let pages = data.filter(p => {
			if (p.parent === 0) {
				let children = data.filter(c => {
					if (c.parent === p.id) {
						var child = c;
						Object.keys(c.tools).forEach(k => {
							p.tools[k] = p.tools[k].concat(c.tools[k]);
							p.tools[k] = [...new Set(p.tools[k])]
						})
					} 
					return child
				});
				return Object.assign(p, {
					hidden: (this.state.hiddenProjs.filter(h=>h[0] === p.slug).length > 0 ? true : false),
					projects: children
				})
			}
		});
		return pages;
		function findImages(proj) {
			let html = document.createElement("div");
			html.innerHTML = proj.content.rendered;
			var imgs = []
			html.querySelectorAll("figure").forEach(fig=>{
				let imgTag = fig.querySelector("img");
				let imgCap = fig.querySelector("figcaption");
				imgs.push({
					src: imgTag === null ? "" : imgTag.src,
					caption: imgCap === null ? null : imgCap
				})
			})
			return imgs
		}

	}
	async componentDidMount() {
		let allProjs = await this.getProjects({
			per_page: "100"
		});
		this.setState({
			allProjects: this.organizeProjects(allProjs)
		})
		setInterval(() => {
			this.setState(prevState => {
				return {
					iterator: prevState.iterator === (prevState.navData.tickerA.length - 1) ? 0 : prevState.iterator + 1
				}
			});
		}, 1000)
	}
	openAbout() {
		const aboutHtml = () => {
			return <div id="about">
				<img className="avatar" src={avatar} alt="" />
				<div className="column">
					<h3>About</h3>
					<p>Designer &amp; Developer.</p>
				</div>
				<div className="column">
					<h3>Interests</h3>
					<p>UI/UX Design, Front-End Development and Graphic Design</p>
				</div>
			</div>
		};
		this.modalToggle(true, aboutHtml(), "Contact", () => {
			window.location.href = `${process.env.PUBLIC_URL}/contact`;
		});
	}
	navPeek(ev) {
		switch (ev.type) {
			case "click":
				if (this.state.navData.open) {
					this.setState(prevState => {
						return {
							navData: {
								...prevState.navData,
								forced: false,
								replace: false,
								peeked: false,
								open: false
							}
						}
					})
				} else {
					this.setState(prevState => {
						return {
							navData: {
								...prevState.navData,
								forced: false,
								replace: false,
								open: true
							}
						}
					})
				}
				break;
			case "mouseenter":
				if (window.innerWidth >= 1000) {
					this.setState(prevState => {
						return {
							navData: {
								...prevState.navData,
								peeked: true
							}
						}
					})
				}
				break;
			case "mouseleave":
				if (window.innerWidth >= 1000) {
					this.setState(prevState => {
						return {
							navData: {
								...prevState.navData,
								peeked: false
							}
						}
					})
				}
				break;
			default:
				break;
		}
	}
	modalToggle(bool, content, action, callback, persist) {
		this.setState(prevState => {
			return {
				modalData: {
					...prevState.modalData,
					isOpen: bool,
					content: content,
					callback: callback,
					action: action,
					persist: persist
				}
			}
		})
	}
	async getProjects(params){
		let url = new URL("https://wp.malikdunston.com/wp-json/wp/v2/projects");
		url.search = new URLSearchParams(params).toString();
		return  await fetch(url).then(resp => resp.json());
	}
	selectProj = (project) => (ev) => {
		switch (ev.type) {
			case "touchstart":
			case "mouseenter":
				project.selected = true;
				this.setState(prevState => {
					return {
						navData: {
							...prevState.navData,
							tickerB: project.title.rendered,
							peeked: true,
							replaced: true
						}
					}
				});
				break;
			case "touchend":
			case "mouseleave":
				if (project.clicked) {
				} else {
					project.selected = false;
					this.setState(prevState => {
						return {
							navData: {
								...prevState.navData,
								tickerB: project.title.rendered,
								peeked: false,
								replaced: false
							}
						}
					});
				}
				break;
			case "click":
				if (window.innerWidth >= 1000) {
					window.location.href = `${process.env.PUBLIC_URL}/work/${project.slug}`
				} else {
					project.clicked = !project.clicked;
					project.selected = (project.clicked ? true : false);
					this.setState(prevState => {
						return {
							navData: {
								...prevState.navData,
								tickerB: project.title.rendered,
								forced: !prevState.navData.forced,
								peeked: (project.clicked ? true : false),
								replaced: (project.clicked ? true : false)
							}
						}
					});
				}
				break;
			default:
				break;
		}
		this.setState(prevState => {
			return {
				currentProj: prevState.allProjects.filter(p => p.selected === true)[0]
			}
		});
	}
	render() {
		return (
			<div className={"App"}>
				<Navigation
					i={this.state.iterator}
					data={this.state.navData}
					modalData={this.state.modalData}
					modalToggle={this.modalToggle}
					openAbout={this.openAbout}
					navPeek={this.navPeek} />
				<Route
					exact path="/work/:projectName"
					render={(props) => (
						<div id="casestudy">
							<Casestudy
								{...props}
								data={this.state.allProjects.filter(p=>p.slug === props.match.params.projectName)[0]}
								hiddenProjs={this.state.hiddenProjs}
								modalToggle={this.modalToggle}
								getData={this.getData}/>
								<article>
									<section className="text">
										<div className="column">
											<h3>Browse More Projects</h3>
										</div>
									</section>
									<Projects
										currentProj={this.state.currentProj}
										selectProj={this.selectProj}
										allProjects={this.state.allProjects.filter(p=>p.hidden === false)}/>
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
							<div id="homepage" onClick={this.openAbout}>
								<h3>Malik Dunston</h3>
								<p>Web + Design 👍🏿</p>
							</div>
							<Projects
								currentProj={this.state.currentProj}
								select={this.select}
								selectProj={this.selectProj}
								allProjects={this.state.allProjects.filter(p=>p.hidden === false)}/>
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
}; 

export default withRouter(App);