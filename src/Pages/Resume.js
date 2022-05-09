import React, { useState, useEffect } from 'react';
import getData from "./../Services/getData";
import { formatResume } from "./../Services/resume";
function Resume( props ){
	const [ resume, setResume ] = useState({
		about: {},
		experience: [],
		education: [],
		skills: [],
	});
	const getResume = async () => {
		let people = await props.getResume("people");
		let experience = await props.getResume("experience");
		let education = await props.getResume("education");
		let skills = await props.getResume("skills");
		let resume = formatResume({
			about: people[0],
			experience: experience,
			education: education,
			skills: skills
		});
		setResume(resume);
	}
	const printResume = () => {
		window.print()
	}
	useEffect(() => { 
		getResume();
	}, []);
	return <div>
		<div id="resume_menu">
			<button onClick={printResume}>Print</button>
		</div>
		<div id="resume">
			{resume.about ? <section id="about">
				<h1>{resume.about.name_first + " " + resume.about.name_last}</h1>
				<p>
					<span>{resume.about.location}</span>
					 – <a href={`tel:${resume.about.phone}`}>{resume.about.phone}</a>
					<br />
					<a href={`https://www.${resume.about.portfolio}`}>{resume.about.portfolio}</a>
					<br />
					<a href={`tel:${resume.about.email}`}>{resume.about.email}</a>
					<a href={`tel:${resume.about.linkedin}`}>{resume.about.linkedin}</a>
				</p>
			</section> : ""}
			{resume.skills ? <section id="skills">
				<h2>Skills</h2>
				<p>
					{resume.skills.map((skill, i) => <span>
						{skill.name + (i < resume.skills.length - 1 ? ", " : "")}
					</span>)}
				</p>
			</section> : ""}
			{resume.experience ? <section id="experience">
				<h2>Experience</h2>
				{resume.experience.map((job, i) => <div>
					<h3>
						<div>
							{job.client}
							{job.location ? <span>, {job.location}</span> : ""}
						</div>
						<div>{job.from} – {job.to ? job.to : "Present"}</div>
					</h3>
					{/* <p>Employer Description</p> -- not yet in db*/}
					<ul>
						<h4>{job.role}</h4>
						<li>Articulated XYZ to do ABC</li>
						<li>Developed XYZ to do ABC</li>
					</ul>
				</div>)}
			</section> : ""}
			{resume.education ? <section id="education">
				<h2>Education</h2>
				{resume.experience.map((job, i) => <div>
					<h3>
						<div>{job.client}<span>, </span>{job.location}</div>
						<div>{job.from} – {job.to}</div>
					</h3>
					{/* <p>Employer Description</p> -- not yet in db*/}
					<ul>
						<h4>{job.role}</h4>
						<li>Articulated XYZ to do ABC</li>
						<li>Developed XYZ to do ABC</li>
					</ul>
				</div>)}
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
			</section> : ""}
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