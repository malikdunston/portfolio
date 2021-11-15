import React, { useState, useEffect } from 'react';
import getData from "./../Services/getData";
// npm install "C:\Users\crdun\Desktop\malik\work\web\simple_slider.git"
import { Slider } from 'slides-cards';
import { Link } from 'react-router-dom';
function Home( props ) {
	useEffect(() => { props.getProjects() }, []);
	const template = card => <div style={{position: "relative", width: "100%", height: "100%"}}>
		{card.acf.cover ? <img src={card.acf.cover} 
			alt={card.title.rendered}
			style={{ objectFit:"cover", width:"100%", height:"100%", position:"absolute" }} /> : ""}
		<div className="card-content"
			style={{
				bottom:"0",
				width:"100%",
				position:"absolute",
				background: "rgba(0, 0, 0, .5)",
				color: "white"
			}}>
			<h1 dangerouslySetInnerHTML={{__html: card.title.rendered}}></h1>
			<Link to={"/work/"+card.slug} className={"button"}> View </Link>
		</div>
	</div>
	return <div>
		{props.projects ? <Slider cards={props.projects.filter(p => p.parent === 0)}
			cardData={template}
			controls={true}
			cardSize={66.66}/> : ""}
	</div>
} 
export default Home;