import { getDefaultNormalizer } from "@testing-library/dom";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Projects extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allProjects: [],
			projTouched: false
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
	handle(ev){
		let thisProj = ev.currentTarget;
		let projects = thisProj.parentNode;
		projects.querySelectorAll(".proj").forEach(proj => proj.classList.remove("proj-hover"))
		switch (ev.type){
			case "click":
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
		// console.log(projects);
	}
	render() {
		return (
			<div id="projects" 
				className={this.state.projTouched ? "touched" : null}>
				{this.state.allProjects.map(project => {
					return (
					// Dev Ed 22:00 - explaining going to an item's specific
					// page!!!
						<div 
							className="proj"
							onTouchStart={this.handle}
							onTouchEnd={this.handle}
							onClick={this.handle}>
							<h3 className="proj-title">{project.title}</h3>
							<div className="proj-details">{project.year}</div>
							<img className="proj-img" src={project.cover} alt={project.title} />
							<Link 
								to={`/work/${project.slug}`} 
								key={project.id}>
								Explore
							</Link>
						</div>
					)
				})}
			</div>
		)
	}
}; export default Projects;