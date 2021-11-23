import React, { useState, useEffect } from 'react';
function CaseStudy({ projects, thisProject, match, selectProject}) {
	useEffect(() => { 
		selectProject({
			slug: match.params.projSlug
		})
	}, [ projects ]);
	return thisProject ? <div id={"casestudy"} className={"casestudy " + thisProject.slug}>
		<header>
			<img src={thisProject.acf.cover} alt={thisProject.title.rendered} />
			<h1>{thisProject.title.rendered}</h1>
		</header>
		{thisProject.projChildren.map((p, i) => <article>
			{p.title.rendered}
		</article>)}
	</div> : ""
} 
export default CaseStudy;