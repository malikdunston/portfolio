import React, { Component } from "react";
import {Link} from "react-router-dom";

class Navigation extends Component { 
constructor(props){
	super(props);
}
render(){ return (
	<nav>
		<div id="circle"></div>
		<div id="logo"></div>
		<div class="ticker-a"></div>
		<div class="ticker-b"></div>
	</nav>
) }
} export default  Navigation;