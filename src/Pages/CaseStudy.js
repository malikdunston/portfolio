import React, { useState, useEffect } from 'react';
function CaseStudy({ projects, thisProject, getProjects, match, selectProject}) {
	useEffect(() => { 
		selectProject({
			slug: match.params.projSlug
		})
	}, [ projects ]);
	return <div>
		{projects ? projects.map(proj => proj.slug) : ""} <br/>
		{thisProject ? thisProject.title.rendered : ""}
	</div>
} 
export default CaseStudy;