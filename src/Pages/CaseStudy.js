import React, { useState, useEffect } from 'react';
import { organizeContent } from "./../Services/wordpress";
function CaseStudy({ projects, thisProject, match, selectProject}) {
	useEffect(() => { 
		selectProject({
			slug: match.params.projSlug
		})
	}, [ projects ]);
	return thisProject ? <div className={"casestudy " + thisProject.slug}>
		<header>
			<img src={thisProject.acf.cover} alt={thisProject.title.rendered} />
			<h1>{thisProject.title.rendered}</h1>
		</header>
		{thisProject.projChildren.map((p, i) => <article>
			<section>
				<h3>{p.title.rendered}</h3>
				<p>Some content goes here......</p>
			</section>
			<section className="content">
				{organizeContent( p.content.rendered ).map((img, i) => <div className="figure"
					key={img.src}>
					<img src={img.src} alt="" />
					{img.caption ? <p>{img.caption}</p> : ""}
				</div>)}
			</section>
		</article>)}
	</div> : ""
} 
export default CaseStudy;