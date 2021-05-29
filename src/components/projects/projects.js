import { getDefaultNormalizer } from "@testing-library/dom";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Projects extends Component {
	constructor(props) {
		super(props);
		this.select = this.select.bind(this);
	}
	select = (project) => (ev) => {
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
				{this.props.allProjects.map(project => {
					return (
						<div key={project.slug}
							className={project.slug}
							onTouchStart={this.select(project)}
							onTouchEnd={this.select(project)}
							onClick={this.select(project)}>
							<h3 className="proj-title">{project.title}</h3>
							<div className="proj-details">
								{/* huh? */}
								<h2 className="proj-tagline">{project.title}</h2>
								<div className="skills">
									{Object.keys(project.skills).map(sk=>{
										return (
											<div className={sk}>
												{project.skills[sk].map(s=><span>{s}</span>)}
											</div>
										)
									})}
								</div>
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