import { getDefaultNormalizer } from "@testing-library/dom";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Projects extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allProjects: [],
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
		let thisProj = ev.currentTarget,
			siblingProjs = thisProj.parentNode.querySelectorAll(":scope > *:not(." + project.slug + ")");
		switch (ev.type){
			case "touchstart":
				thisProj.classList.add("proj-hover")
				siblingProjs.forEach(proj => proj.classList.add("proj-bg"))
				break;
			case "click":
				this.setState({currentProject: project}, ()=>console.log(this.state.currentProject))
				thisProj.classList.toggle("clicked");
				siblingProjs.forEach(proj => proj.classList.toggle("proj-hide"))
				break;
			case "touchend":
				thisProj.classList.remove("proj-hover")
				siblingProjs.forEach(proj => proj.classList.remove("proj-bg"))
				break;
		}
	}
	render() {
		return (
			<div id="projects">
				{this.state.allProjects.map(project => {
					return (
						<div key={project.slug}
							className={project.slug}
							onTouchStart={this.handle(project)}
							onTouchEnd={this.handle(project)}
							onClick={this.handle(project)}>
							<h3 className="proj-title">{project.title}</h3>
							<div className="proj-details">
								<h2 className="proj-tagline">{project.title}</h2>
								<div className="skills"></div>
								<Link to={`/work/${project.slug}`} 
									className="explore">
									<h2>Explore</h2>
								</Link>
							</div>
							<img className="proj-img" src={project.cover} alt={project.title} />
						</div>
					)
				})}
			</div>
		)
	}
}; export default Projects;