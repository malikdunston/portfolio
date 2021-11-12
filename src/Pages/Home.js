import React, { useState, useEffect } from 'react';
import getData from "./../Services/getData";
import Slider from "./../Components/SliderJS/Slider";
function Home( props ) {
	const [ projects, setProjects ] = useState([]);
	const getProjects = async () => {
		let projects = await props.getData("graphic-design");
		console.log( projects );
		setProjects( projects );
	}
	useEffect(() => {
		getProjects();
	}, [])
	return <div id="home">
		{projects ? projects.map(p => p.title.rendered) : ""}
		{projects ? <Slider slides={projects}
			transition={200}
			controls={true} /> : ""}
	</div>
} 
export default getData( Home );