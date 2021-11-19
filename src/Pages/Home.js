import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Slider } from 'malikdunston-slider'
function Home({ projects, getProjects }) {
	useEffect(() => { getProjects() }, []);
	const template = card => <div style={{position: "relative", width: "100%", height: "100%"}}>
		{card.acf.cover ? <img src={card.acf.cover} 
			alt={card.title.rendered}
			style={{ objectFit:"cover", width:"100%", height:"100%", position:"absolute" }} /> : ""}
		<div className="shader"></div>
		<div className="card-content">
			<h1 dangerouslySetInnerHTML={{__html: card.title.rendered}}></h1>
			<p>A multi-faceted project connecting citizens with our National Parks.</p>
			<Link to={"/work/"+card.slug}> EXPLORE </Link>
		</div>
	</div>
	const breadcrumbs = proj => <img src={proj.acf.cover} alt="" />
	return <div>
		<Slider cards={projects}
			axis={"Y"}
			template={template}
			breadcrumbs={breadcrumbs}
			size={100}/>
	</div>
} 
export default Home;