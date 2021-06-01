import React, { Component, useParams } from "react";
class Casestudy extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		console.log("case-study route", this.props.currentProject);
		let slug = this.props.thisRoute.match.params.projectName;
		this.props.getData("projects", 0, (data) => {
			let thisProj = data.filter(p=>p.slug == slug)[0];

			// this.setState({
			// 	allProjects: projects.map((proj) => {
			// 		return this.constructProject(proj)
			// 	})
			// });
		})
		// if(this.props.currentProject){
		// }else{
		// 	this.props.getData( "projects", 0, (data) => {
		// 		let thisProj = data.filter(p=>p.slug == slug);
		// 		console.log(thisProj);
		// 		this.setState({
		// 			project: this.props.constructProject(thisProj)
		// 		});
		// 	})
		// }
	}
	render() {
		return (
			<div>
				as;dlkfja;sldkfja;sldkfja;sdlkfja;sl
			</div>
			// <div id={this.state.project.slug} className="casestudy">
			// 	<h1>{this.state.project.title}</h1>
			// 	<h3>{this.state.project.year}</h3>
			// 	<div>{this.state.project.content}</div>
			// </div>
		)
	}
} export default Casestudy;