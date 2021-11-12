import React from "react";
export default function BtnSlider({ direction, move }) {
	const viewBox = "0 0 100 100";
	const css = {
		width: "2rem",
		height: "2rem",
	}
	return <svg className={direction === "next" ? "next" : "prev"}
		viewBox={viewBox} 
		style={css}
		onClick={move}>
		<polyline 
			points={direction === "next" ? "0 100 50 50 0 0" : "100 0 50 50 100 100"}
			style={{pointerEvents: "none"}}>
		</polyline>
	</svg>
}