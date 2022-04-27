import React, { useState, useEffect } from 'react';
import getData from "./../Services/getData";
function Resume( props ){
	const [ resume, setResume ] = useState({
		experience: [],
		education: [],
		skills: [],
	});
	const getResumeData = async () => {
		let experience = await props.getResume("experience");
		let education = await props.getResume("education");
		let skills = await props.getResume("skills");
		setResume(oldResume => ({
			experience: experience,
			education: education,
			skills: skills
		}));
	}
	const printResume = () => {
		window.print()
	}
	useEffect(() => { 
		getResumeData();
	}, []);
	return <div>
		<div id="resume_menu">
			<button onClick={printResume}>Print</button>
		</div>
		<div id="resume">
			<section id="about">
				<h1>Malik Dunston</h1>
				<p>Atlanta, GA - 770.895.2061</p>
				<p><a href="https://www.malikdunston.com">malikdunston.com</a></p>
				<p><a href="mailto:malik.dunston.1024@gmail.com">malik.dunston.1024@gmail.com</a></p>
			</section>
			<section id="skills">
				<h2>Skills</h2>
				<p>
					<span>React<span>, </span></span>
					<span>Typescript<span>, </span></span>
				</p>
			</section>
			<section id="experience">
				<h2>Experience</h2>
				<div>
					<h3>
						<div>Employer<span>, Location</span></div>
						<div>November 2019 – May 2021</div>
					</h3>
					<p>Employer Description</p>
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
					<h3>
						<div>Bachelor of Science<span>, Major</span></div>
						<div>Univeristy<span>, Location</span><span>, August 2019</span></div>
					</h3>
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
	</div>
} 
export default getData( Resume );