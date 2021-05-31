import React, { Component, useParams } from "react";
class Casestudy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			project: {}
		}
	}
	componentDidMount() {
		let slug = this.props.thisRoute.match.params.projectName;
		this.props.getThisProject(
			"casestudy",
			slug,
			(data) => {
				console.log(data[0]);
				this.setState({
					project: this.props.constructProject(data[0])
				});
			}
		)
	}
	render() {
		return (<div id={this.state.project.slug} className="casestudy">
			<h1>{this.state.project.title}</h1>
			<h3>{this.state.project.year}</h3>
			<div>{this.state.project.content}</div>
		</div>)
	}
} export default Casestudy;