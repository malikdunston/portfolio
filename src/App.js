import React, { useState, useEffect } from "react";
import { Route, withRouter } from "react-router-dom";
import getData from "./Services/getData";
import { organizePosts } from "./Services/wordpress";
import getBreakpoints from "./Services/getBreakpoints";
import Home from "./Pages/Home";
import CaseStudy from "./Pages/CaseStudy";
import Resume from "./Pages/Resume";
import Navigation from "./Components/Navigation";
function App( props ) {
	const [ projects, setProjects ] = useState([]);
	const [ about, setAbout ] = useState([]);
	const [ currentProject, setCurrentProject ] = useState(null);
	const [ nextProject, setNextProject ] = useState(null);
	const [ breakpoint, setBreakpoint ] = useState({});
	const getProjects = async () => {
		let data = await props.getData("projects");
		setProjects( organizePosts( data ) );
	}
	const getAbout = async () => {
		let data = await props.getData("pages", {slug: "about"});
		setAbout( data );
	}
	const selectNextProject = currentProject => {
		if(currentProject){
			let nextIndex;
			currentProject.order >= projects.filter(proj => !proj.hidden).length - 1 ? nextIndex = 0 : nextIndex = currentProject.order + 1;
			setNextProject( 
				projects.filter(p => p.order === nextIndex)[0]
			);
		}
	}
	const selectProject = params => {
		setCurrentProject( oldCurrentProject => {
			let currentProject = projects.filter(proj => proj.slug === params.slug)[0];
			selectNextProject(currentProject);
			return currentProject
		} );
	}
	useEffect(() => {
		getAbout();
		getProjects();
		setBreakpoint( getBreakpoints( window ) );
		window.addEventListener("resize", e => { setBreakpoint( getBreakpoints( e.target ) ) })
	}, [])
	return <div className={"App " + (props.location.pathname.split("/")[1] || "home") + " " + (breakpoint.name + "-" + breakpoint.size) }>
		<Navigation breakpoint={breakpoint}/>
		<Route exact path="/" render={ props => <Home { ...props } 
			breakpoint={breakpoint}
			projects={[
				...about,
				...projects.filter(proj => !proj.hidden)
			]} />}/>
		<Route exact path="/work/:projSlug" render={ props => <CaseStudy { ...props } 
			projects={projects}
			nextProject={nextProject}
			currentProject={currentProject}
			selectProject={selectProject} />}/>
		<Route exact path="/resume" render={ props => <Resume { ...props } />}/>
	</div>
}
export default withRouter( getData( App ) );