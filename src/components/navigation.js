import React, { Component } from "react";
import {Link} from "react-router-dom";

class Navigation extends Component { 
render(){ return (
	<nav className={
		(this.props.data.peeked ? "peeked" : "")
		+ (this.props.data.forced ? " forced" : "")
		+ (this.props.data.replace ? " replace" : "")
		+ (this.props.data.open ? " open" : "")}
		onMouseEnter={this.props.navPeek}
		onMouseLeave={this.props.navPeek}
		onClick={this.props.navPeek}>
		<div id="circle"></div>
		<div id="logo"></div>
		<div className="ticker-a">{this.props.data.tickerA[this.props.i]}</div>
		<div className="ticker-b">{this.props.data.tickerB}</div>
	</nav>
) }
} export default  Navigation;