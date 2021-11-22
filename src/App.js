import React, { useState, useEffect } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import getData from "./Services/getData";
import Navigation from "./Components/Navigation";
import Home from "./Pages/Home";
import CaseStudy from "./Pages/CaseStudy";
import validateProjects from "./Services/validateProjects";
import getBreakpoints from "./Services/getBreakpoints";
function App( props ) {
	const [ projects, setProjects ] = useState([]);
	const [ breakpoint, setBreakpoint ] = useState({});
	const getProjects = async params => {
		let data = await props.getData("projects", params ? params : "");
		setProjects( validateProjects( data.filter(proj => proj.parent === 0).map(proj => {	
			return {
				...proj,
				projChildren: data.filter(p => {
					return p.parent === proj.id
				})
			}
		}) ) );
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
			projects={projects} />}/>
	</div>
}
export default withRouter( getData( App ) );