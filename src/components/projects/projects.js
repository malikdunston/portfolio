import { getDefaultNormalizer } from "@testing-library/dom";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Projects extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount(){
	}
	render() {
		return (
			<div id="projects">
				{this.props.allProjects.map(project => {
					return <div key={project.id}
						className={project.slug}
						onTouchStart={this.props.select(project)}
						onTouchEnd={this.props.select(project)}
						onMouseEnter={this.props.select(project)}
						onMouseLeave={this.props.select(project)}
						onClick={this.props.select(project)}>
						<h3 className="proj-title">{project.title}</h3>
						<div className="proj-details">
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
				})}
			</div>
		)
	}
}; export default Projects;
