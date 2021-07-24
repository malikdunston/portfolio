import React, { Component } from "react";
	import { Link } from "react-router-dom";
	import Projects from "./projects/projects.js";
class Contact extends Component {
	render() {
		return <div id="home">
			<div id="homepage" onClick={this.props.openAbout}>
				<h3>Hello!</h3>
				<p>My name is <a>Malik Dunston</a>, and I'm a Design/Dev hybrid based in Atlanta.</p>
				<button onClick={this.props.openAbout}>Learn More</button>
			</div>
			<Projects
				currentProj={this.props.currentProj}
				selectProj={this.props.selectProj}
				allProjects={this.props.allProjects.filter(p=>p.hidden === false)}/>
		</div>
	};
}; export default Contact;