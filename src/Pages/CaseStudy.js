import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Slider } from 'malikdunston-slider'
function CaseStudy({ projects, match }) {
	const [ caseStudy, setCaseStudy ] = useState({});
	useEffect(() => { 
		setCaseStudy(projects.filter(proj => {
			return proj.slug === match.params.projSlug;
		})[ 0 ])
	}, []);
	return <div>
		{caseStudy.projChildren.map(proj => <div>
			{proj.title.rendered}
		</div>)}
	</div>
} 
export default CaseStudy;