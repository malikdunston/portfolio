import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Slider } from 'malikdunston-slider';
import getBreakpoints from '../Services/getBreakpoints';
function Home({ projects, breakpoint }) {
	const template = card => <div style={{width: "100%", height: "100%"}}>
		{/* for projects that don't yet have two covers.... */}
		{card.acf.cover ? <img src={card.acf.cover} 
			alt={card.title.rendered}
			style={{ objectFit:"cover", width:"100%", height:"100%", position:"absolute" }} /> : ""}
		{card.acf.cover2 ? <img src={card.acf.cover2} 
			alt={card.title.rendered}
			style={{ objectFit:"cover", width:"100%", height:"100%", position:"absolute" }} /> : ""}
		<div className="shader"></div>
		<div className="card-content">
			<h1 dangerouslySetInnerHTML={{__html: card.title.rendered}}></h1>
			<p>{card.acf.about}</p>
			{/* { breakpoint.size <= 1000 ? <Link to={"/work/"+card.slug}>Explore</Link> : ""} */}
		</div>
	</div>
	const breadcrumbs = proj => {
		let img = <img src={proj.acf.cover} alt=""/>;
		return proj.slug === "about" && breakpoint.size >= 1000 ? img : <Link to={"/work/"+proj.slug}>{img}</Link>
	}
	return <div>
		<Slider cards={projects}
			axis={"X"}
			template={template}
			mouseEffect={true}
			breadcrumbs={breadcrumbs}
			size={100}/>
	</div>
} 
export default Home;