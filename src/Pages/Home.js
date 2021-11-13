import React, { useState, useEffect } from 'react';
import getData from "./../Services/getData";
import Slider from "./../Components/SliderJS/Slider";
function Home( props ) {
	useEffect(() => { props.getProjects() }, []);
	return <div>
		{props.projects ? <Slider cards={props.projects}
			transition={200}
			controls={true} /> : ""}
	</div>
} 
export default Home;