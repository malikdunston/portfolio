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
		<section id="about">
			<h1>Malik Dunston</h1>
			<p>Atlanta, GA - 770.895.2061</p>
			<p><a href="https://www.malikdunston.com">malikdunston.com</a></p>
			<p><a href="mailto:malik.dunston.1024@gmail.com">malik.dunston.1024@gmail.com</a></p>
		</section>
		<section id="skills">
			<h2>Skills</h2>
			<p>
				<div>React<span>, </span></div>
				<div>Typescript<span>, </span></div>
			</p>
		</section>
		<section id="experience">
			<h2>Experience</h2>
			<div>
				<div>
					<h3>
						<div>Employer<span>, Location</span></div>
						<div>November 2019 – May 2021</div>
					</h3>
					<p>Employer Description</p>
				</div>
				<ul>
					<h4>Role</h4>
					<li>Articulated XYZ to do ABC</li>
					<li>Developed XYZ to do ABC</li>
				</ul>
			</div>
		</section>
		<section id="education">
			<h2>Education</h2>
			<div>
				<div>
					<h3>
						<div>Bachelor of Science</div>
						<div>, Major</div>
					</h3>
					<p>
						<span>Univeristy</span>
						<span>, Location</span>
						<span>, August 2019</span>
					</p>
				</div>
				<ul>
					<li>Dean's List 2017</li>
					<li>Code Club Member</li>
				</ul>
			</div>
		</section>
		<section id="certifications">
			<h2>Certifications</h2>
			<div>
				<h3>Cert Title</h3>
				<p>Issuer<span>, August 2019</span></p>
			</div>

		</section>
	</div>
} 
export default getData( Resume );