import React, { useState, useEffect } from "react";
import { Route, withRouter } from "react-router-dom";
import getData from "./Services/getData";
import Navigation from "./Components/Navigation";
import Home from "./Pages/Home";
import CaseStudy from "./Pages/CaseStudy";
import validate from "./Services/wordpress";
import getBreakpoints from "./Services/getBreakpoints";
function App( props ) {
	const [ projects, setProjects ] = useState([]);
	const [ thisProject, setThisProject ] = useState([]);
	const [ breakpoint, setBreakpoint ] = useState({});
	const getProjects = async params => {
		let allProjects = await props.getData("projects", params ? params : "");
		setProjects( validate( allProjects ) );
	}
	useEffect(() => {
		setBreakpoint( getBreakpoints( window ) );
		window.addEventListener("resize", e => { setBreakpoint( getBreakpoints( e.target ) ) })
	}, [])
	return <div className={"App " + (props.location.pathname.split("/")[1] || "home") + " " + (breakpoint.name + "-" + breakpoint.size) }>
		<Navigation />
		<Route exact path="/" render={ props => <Home { ...props } 
			getProjects={getProjects}
			breakpoint={breakpoint}
			projects={projects} />}/>
		<Route exact path="/work/:projSlug" render={ props => <CaseStudy { ...props } 
			getProjects={getProjects}
			projects={projects}
			thisProject={thisProject}
			setThisProject={setThisProject}/>}/>
	</div>
}
export default withRouter( getData( App ) );