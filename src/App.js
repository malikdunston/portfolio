import React, { useState, useEffect } from "react";
import { Route, withRouter } from "react-router-dom";
import getData from "./Services/getData";
import { organizePosts } from "./Services/wordpress";
import getBreakpoints from "./Services/getBreakpoints";
import Home from "./Pages/Home";
import CaseStudy from "./Pages/CaseStudy";
import Navigation from "./Components/Navigation";
function App( props ) {
	const [ projects, setProjects ] = useState([]);
	const [ hiddenProjs, setHiddenProjs ] = useState([]);
	const [ thisProject, setThisProject ] = useState(null);
	const [ breakpoint, setBreakpoint ] = useState({});
	const getProjects = async () => {
		let data = await props.getData("projects");
		setProjects( organizePosts( data ) );
	}
	const selectProject = params => {
		let thisProject = projects.filter(proj => proj.slug === params.slug)[0];
		setThisProject( thisProject );
	}
	useEffect(() => {
		getProjects();
		setBreakpoint( getBreakpoints( window ) );
		window.addEventListener("resize", e => { setBreakpoint( getBreakpoints( e.target ) ) })
	}, [])
	return <div className={"App " + (props.location.pathname.split("/")[1] || "home") + " " + (breakpoint.name + "-" + breakpoint.size) }>
		<Navigation />
		<Route exact path="/" render={ props => <Home { ...props } 
			breakpoint={breakpoint}
			projects={projects.filter(proj => !proj.hidden)} />}/>
		<Route exact path="/work/:projSlug" render={ props => <CaseStudy { ...props } 
			projects={projects}
			thisProject={thisProject}
			selectProject={selectProject} />}/>
	</div>
}
export default withRouter( getData( App ) );