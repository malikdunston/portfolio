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
	this.props.getProjects(
		"projects",
		undefined,
		(projects)=>{
			this.setState({
				allProjects: projects.map((proj)=>{
					return this.props.constructProject(proj)
				})
			});
		}
	);
};
render(){
	return (
		<div className="wrap">
			{this.state.allProjects.map(project=> {
				return (
				// Dev Ed 22:00 - explaining going to an item's specific
				// page!!!
					<Link to={`/work/${project.slug}`}  key={project.id}>
						<div className="project">
							{project.title}
							{project.year}
							{project.images.map((img)=>{
								return <img src={img.src} />
							})}
						</div>
					</Link>
				)
			})}
		</div>
	)
}}; export default  Projects;