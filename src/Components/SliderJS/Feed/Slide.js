import React from 'react';
import { Link } from 'react-router-dom';
export default function Slide({ slide }) {
	return <div className="slide" style={{
		position: "relative",
		[slide.axis === "Y" ? "minHeight" : "minWidth"]: "100%"
	}}>
		{slide.image ? <img src={slide.image.url} 
			alt={slide.image.altText}
			style={{ objectFit:"cover", width:"100%", height:"100%", position:"absolute" }} /> : ""}
		<div className="slider-content"
			style={{
				bottom:"0",
				width:"100%",
				position:"absolute",
				background: "rgba(0, 0, 0, .5)",
				color: "white"
			}}>
			<Link to={"/article/"+slide.id}>
				<h2>{slide.title}</h2>
			</Link>
		</div>
	</div>
}