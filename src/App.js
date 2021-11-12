import React, { useState, useEffect } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import getData from "./Services/getData";
import Navigation from "./Components/Navigation";
import Home from "./Pages/Home";
function App( props ) {
	const [ projects, setProjects ] = useState([]);
	const getProjects = async () => {
		let projects = await props.getData("graphic-design");
		setProjects( projects );
	}
	return <div className={"App " + (props.location.pathname.split("/")[1] || "home")}>
		{/* <Navigation /> */}
		<Route exact path="/" 
			render={ props => <Home { ...props } 
				getProjects={getProjects} 
				projects={projects} />}/>
	</div>
}
export default withRouter( getData( App ) );