import React, { useState, useEffect } from 'react';
function CaseStudy({ getProjects, match }) {
	const [ projects, setProjects ] = useState([]);
	useEffect(async () => { 

		let thisProj = await getProjects(match.params.projSlug)[ 0 ];

		// let thisProj = projects.filter(proj => proj.slug === match.params.projSlug)[ 0 ]
		// let thisProj = projects;
		console.log(thisProj);
		setProjects(thisProj)
	}, []);
	return <div>
		{/* {caseStudy.projChildren.map(proj => <div>
			{proj.title.rendered}
		</div>)} */}
	</div>
} 
export default CaseStudy;