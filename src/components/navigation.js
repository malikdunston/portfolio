import React, { Component } from "react";
import {Link} from "react-router-dom";

class Navigation extends Component { render(){ return (
	<nav>
		<div id="lockup">
			<svg id="logo"></svg>
			<h2 id="title">
				Malik<br></br>
				Dunston
			</h2>
		</div>				
		<ul className="menu">
			<Link to="/">
				<li>
					Work
				</li>
			</Link>
		</ul>
	</nav>
) } } export default  Navigation;