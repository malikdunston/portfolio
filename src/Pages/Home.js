import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Slider } from 'malikdunston-slider';
function Home({ projects }) {
	const template = card => <div style={{width: "100%", height: "100%"}}>
		{card.acf.cover ? <img src={card.acf.cover} 
			alt={card.title.rendered}
			style={{ objectFit:"cover", width:"100%", height:"100%", position:"absolute" }} /> : ""}
		<div className="shader"></div>
		<div className="card-content">
			<h1 dangerouslySetInnerHTML={{__html: card.title.rendered}}></h1>
			<p>{card.acf.about}</p>
			<Link to={"/work/"+card.slug} className="explore"> EXPLORE </Link>
		</div>
	</div>
	const breadcrumbs = proj => <img src={proj.acf.cover} alt="" />
	return <div>
		<Slider cards={projects}
			axis={"X"}
			template={template}
			breadcrumbs={breadcrumbs}
			size={100}/>
	</div>
} 
export default Home;
