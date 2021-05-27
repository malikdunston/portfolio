import { getDefaultNormalizer } from "@testing-library/dom";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Projects extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allProjects: [],
			projTouched: false,
			currentProject: null
		}
		this.handle = this.handle.bind(this);
	}
	componentDidMount() {
		this.props.getData(
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
						return this.props.constructProject(proj)
					})
				});
			}
		);
	};
	handle = (project) => (ev) => {
		this.setState({currentProject: project}, ()=>console.log(this.state))
		let thisProj = ev.currentTarget;
		let projects = thisProj.parentNode;
		projects.querySelectorAll(".proj").forEach(proj => proj.classList.remove("proj-hover"))
		switch (ev.type){
			case "click":
				projects.querySelectorAll(".proj")
					// .filter(proj => proj.)
					.forEach(proj => proj.classList.add("proj-hide"))
				thisProj.classList.add("clicked");
				break;
			case "touchstart":
				let target = ev.touches[0].target;
				thisProj.classList.add("proj-hover")
				this.setState({projTouched: true})
				break;
			// case "touchend":
			// 	// target = ev.touches[0].target;
			// 	// thisProj.classList.add("proj-hover")
			// 	this.setState({projTouched: false})
			// 	break;
		}
		console.log(project);
	}
	render() {
		return (
			<div id="projects" 
				className={this.state.projTouched ? "touched" : null}>
				{this.state.allProjects.map(project => {
					return (
						<div key={project.slug}
							className="proj"
							onTouchStart={this.handle(project)}
							onTouchEnd={this.handle(project)}
							onClick={this.handle(project)}>
							<h3 className="proj-title">{project.title}</h3>
							<div className="proj-details">{project.year}</div>
							<img className="proj-img" src={project.cover} alt={project.title} />
							<Link to={`/work/${project.slug}`}>Explore</Link>
						</div>
					)
				})}
			</div>
		)
	}
}; export default Projects;