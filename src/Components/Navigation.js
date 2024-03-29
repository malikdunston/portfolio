import React, { useState } from 'react'
import { Link } from "react-router-dom";
export default function Navigation ({ breakpoint }) {
	const [ open, setOpen ] = useState(false);
	const toggle = e => {
		if(breakpoint.size >= 1000) {
			window.location.href = "https://www.malikdunston.com"
		} else {
			setOpen(!open)
		}
	}
	return <nav className={open ? "open" : ""} onClick={toggle}>
		<div id="circle"></div>
		<div className="nav-header">
			<div className="logo">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.01 29.99">
					<path d="M29,9.7v0h0a14.88,14.88,0,0,0-1.17-2.39h0l-.12-.18q-.27-.43-.56-.84l-.36-.48c-.16-.2-.32-.4-.49-.59s-.36-.41-.55-.61l-.36-.36c-.25-.24-.51-.48-.78-.71l-.19-.15c-.22-.18-.44-.37-.67-.54l-.57-.4a15,15,0,0,0-1.37-.79l-.63-.3A14.92,14.92,0,0,0,15.28,0l.11.07L15,0a15,15,0,0,0-2.37.21V.18a14.93,14.93,0,0,0-2,.44V.7A14.93,14.93,0,0,0,5,3.92L5,3.87A15.07,15.07,0,0,0,3.51,5.35l.07,0a15,15,0,0,0-1.44,2V7.28a14.88,14.88,0,0,0-2,5.7c0,.09,0,.17,0,.26,0,.3-.05.61-.07.92s0,.55,0,.83,0,.34,0,.51,0,.64,0,.95.05.37.08.55a14.88,14.88,0,0,0,2,5.7v-.1a15,15,0,0,0,1.23,1.79l0,0a15.06,15.06,0,0,0,1.4,1.5l0,0a14.94,14.94,0,0,0,5.9,3.45h0c.38.11.77.2,1.16.28l.63.12.22,0h0a15,15,0,0,0,2.1.19H15A14.94,14.94,0,0,0,29,9.7Zm-16.35,1,7.27,4.21L12.68,19Zm8.53,2.63-7.78-4.5L21.2,4.31ZM10.68,19.35l-7.8-4.52,7.8-4.48Zm10.53-2.9v9l-7.8-4.52Zm2,8.63V16.75l4.13,2.39A13,13,0,0,1,23.2,25.09Zm.75-10.21,3.84-2.21a12.2,12.2,0,0,1,0,4.45ZM23.2,13v-8a13,13,0,0,1,4,5.72ZM15,2a12.88,12.88,0,0,1,4.6.86l-7,4V2.28A13,13,0,0,1,15,2Zm-4.37.77V7.19L6.85,5A13,13,0,0,1,10.68,2.82Zm-1.26,6L2.27,12.88A12.91,12.91,0,0,1,5.36,6.42Zm-7.21,8L9.4,20.92,5.14,23.37A12.91,12.91,0,0,1,2.21,16.76ZM6.6,24.84l4.08-2.34v4.72A13,13,0,0,1,6.6,24.84ZM15,28a13,13,0,0,1-2.37-.23V22.82L19.92,27l0,0A12.89,12.89,0,0,1,15,28Z"/>
				</svg>
			</div>
			<Link to="/" className={"masthead"}>
				<h3>
					Malik<br/>Dunston
				</h3>
			</Link>
		</div>
		<div className="nav-body">
			<ul className="menu">
				{breakpoint.size <= 1000 ? <Link to="/">
					<li>
						<h3>Home</h3>
					</li>
				</Link> : ""}
				<a href="mailto: malik.dunston.1024@gmail.com">
					<li>
						<h3>Reach Out</h3>
					</li>
				</a>
				<Link to="/resume">
					<li>
						<h3>Resume</h3>
					</li>
				</Link>
			</ul>
		</div>
	</nav>
}