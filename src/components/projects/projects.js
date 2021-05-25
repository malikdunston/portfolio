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
			console.log(parents);
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
					<Link to={`/work/${project.slug}`}  key={project.id}>
						<div className="proj">
							<div className="proj-title">
								{project.title}
							</div>
							<div className="proj-details">
								{project.year}
							</div>
							{/* <img src={project.acf.cover} alt="" /> */}
							{/* {project.images.map((img)=>{
								return <img className="proj-img" src={img.src} />
							})} */}
						</div>
					</Link>
				)
			})}
		</div>
	)
}}; export default  Projects;