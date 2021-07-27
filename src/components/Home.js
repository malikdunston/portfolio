import React, { Component } from "react";
class Home extends Component {
	render() {
		return <div id="home">
			<div id="homepage" className={"column " + (this.props.projHover === true ? "hidden" : "")}  onClick={this.props.openAbout}>
				<h3>Hello!</h3>
				<p>My name is <a>Malik Dunston</a>, and I'm a Design/Dev hybrid based in Atlanta, GA.</p>
				<button onClick={this.props.openAbout}>Learn More</button>
			</div>
			{/* <Projects
				currentProj={this.props.currentProj}
				selectProj={this.props.selectProj}
				allProjects={this.props.allProjects.filter(p=>p.hidden === false)}/> */}
		</div>
	};
}; export default Home;