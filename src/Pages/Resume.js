import React, { useState, useEffect } from 'react';
import getData from "./../Services/getData";
function Resume( props ){
	const [ resume, setResume ] = useState([]);
	const getResume = async () => {
		let data = await props.getData("resume");
		setResume(data);
	}
	useEffect(() => { 
		getResume();
	}, []);
	return <div id={"resume"}>
		Malik Dunston
	</div>
} 
export default getData( Resume );