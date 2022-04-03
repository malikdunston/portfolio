import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Slider } from 'malikdunston-slider';
function Home({ projects, breakpoint }) {
	const template = proj => <div style={{width: "100%", height: "100%"}}>
		{proj.acf.cover2 ? <img src={proj.acf.cover2} 
			alt={proj.title.rendered}
			style={{ objectFit:"cover", width:"100%", height:"100%", position:"absolute" }} /> : ""}
		<div className="shader"></div>
		<div className="card-content">
			<h1 dangerouslySetInnerHTML={{__html: proj.title.rendered}}></h1>
			<p>{proj.acf.about}</p>
		</div>
	</div>
	const breadcrumbs = proj => {
		let img = <img src={proj.acf.cover} alt=""/>;
		return <Link to={"/work/"+proj.slug}>{img}</Link>
	}
	return <div>
		{projects ? <Slider cards={projects}
			axis={"X"}
			template={template}
			mouseEffect={true}
			breadcrumbs={breadcrumbs}
			size={100}/> : ""}
	</div>
} 
export default Home;