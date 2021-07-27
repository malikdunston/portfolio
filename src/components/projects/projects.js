import React, { Component } from "react";
import { Link } from "react-router-dom";
class Projects extends Component {
	render() {
		return <div id="projects">
			<div className="column">
				<h3>Browse More Projects</h3>
			</div>
			{this.props.allProjects.map(project => {
				return <div key={project.id}
					className={"proj " + project.slug 
						+ (this.props.currentProj === project  ? " proj-hover" : "")
						+ (project.clicked  ? " clicked" : "")
						+ ((this.props.currentProj !== project && this.props.currentProj)  ? " proj-bg" : "")
						+ ((this.props.currentProj && this.props.currentProj.clicked && this.props.currentProj !== project)  ? " proj-hide" : "")}
					onTouchStart={this.props.selectProj(project)}
					onMouseEnter={this.props.selectProj(project)}
					onTouchEnd={this.props.selectProj(project)}
					onMouseLeave={this.props.selectProj(project)}
					onClick={this.props.selectProj(project)}>
					<img className="proj-img" src={project.cover} alt={project.title} />
					<h3 className="proj-title">{project.title.rendered}</h3>
					<div className="proj-details">
						<h2 className="proj-tagline">{project.title.rendered}</h2>
						<div className="skills">
							{Object.keys(project.tools).map(tool=>{
								return ( <div className={tool} key={tool}>
									{project.tools[tool].map(s=><span key={s}>{s}</span>)}
								</div>)
							})}
						</div>
						<Link to={`/work/${project.slug}`}>
							<button>View</button>
						</Link>
					</div>
				</div>
			})}
		</div>
	}
}; export default Projects;
