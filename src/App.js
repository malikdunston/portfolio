import React, { useState, useEffect } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import Navigation from "./Components/Navigation";
import Home from "./Pages/Home";
function App( props ) {
	return <div className={"App " + (props.location.pathname.split("/")[1] || "home")}>
		<Navigation/>
		<Route exact path="/"
			render={()=>{
				return <Home/>
			}}/>
		{/* <Route exact path="/project/:project-slug?"
			render={params => {
				return <Project {...params}/>
			}}/> */}
	</div>
}
export default withRouter(App);