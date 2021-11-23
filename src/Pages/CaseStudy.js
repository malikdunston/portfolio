import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Slider } from 'malikdunston-slider';
function CaseStudy({ projects, getProjects, match }) {
	useEffect(() => { getProjects({ slug: match.params.projSlug }) }, []);
	const sections = projects[0].projChildren;
	return <div>
		{sections.map(section => <div>
			{section.title.rendered}
		</div>)}
	</div>
} 
export default CaseStudy;