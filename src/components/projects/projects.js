import { getDefaultNormalizer } from "@testing-library/dom";
	import React, { Component } from "react";
	import { Link } from "react-router-dom";

class Projects extends Component {
constructor(props){
	super(props);
	this.state = {
		allProjects: []
	}
}
componentDidMount(){
	this.props.getData(
		"projects",
		undefined,
		(projects)=>{
			let parents = projects.filter(proj => proj.parent == 0);
			let children = projects.filter(proj => proj.parent !== 0);
			parents = parents.map(par => {
				return {
					...par,
					children: children.filter(child => child.parent == par.id)
				}
			})
			this.setState({
				allProjects: parents.map((proj)=>{
					return this.props.constructProject(proj)
				})
			});
		}
	);
};
render(){
	return (
		<div id="projects">
			{this.state.allProjects.map(project=> {
				return (
				// Dev Ed 22:00 - explaining going to an item's specific
				// page!!!
					<div className="proj">
						<h3 className="proj-title">
							{project.title}
						</h3>
						<div className="proj-details">
							{project.year}
						</div>
						<img className="proj-img" src={project.cover} alt={project.title} />
						<Link to={`/work/${project.slug}`}  key={project.id}>
							Explore
						</Link>
					</div>
				)
			})}
		</div>
	)
}}; export default  Projects;