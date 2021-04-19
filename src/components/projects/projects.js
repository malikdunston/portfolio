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
			// this.props.getProjects(
			// 	"apps",
			// 	undefined,
			// 	(apps)=>{
					this.setState({
						// allProjects: [...projects, ...apps]
						allProjects: [...projects]
					});
			// 	}
			// );
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
							{project.title.rendered}
						</div>
					</Link>
				)
			})}
		</div>
	)
}}; export default  Projects;