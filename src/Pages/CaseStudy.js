import React, { useState, useEffect } from 'react';
import { organizeContent } from "./../Services/wordpress";
function CaseStudy({ projects, currentProject, nextProject, match, selectProject}) {
	useEffect(() => { 
		selectProject({ slug: match.params.projSlug });
	}, [ projects ]);
	return currentProject ? <div className={"case-study " + currentProject.slug}>
		{/* <header>
			<img src={currentProject.acf.cover} alt={currentProject.title.rendered} />
			<div className="shader"></div>
			<h1 dangerouslySetInnerHTML={{ __html: currentProject.title.rendered }}></h1>
		</header>
		{currentProject.projChildren.map((p, i) => <article className={p.slug}>
			<section className={"text"}>
				<h3 className="project-section-title" dangerouslySetInnerHTML={{ __html: p.title.rendered }}></h3>
				<div dangerouslySetInnerHTML={{ __html: p.acf.html }}></div>
				{p.acf.url || p.acf.repo ? <div className="btn-group">
					{p.acf.url ? <a className="button" 
						href={p.acf.url} 
						target="_blank" 
						rel="noreferrer">
							Live
						</a> : ""}
					{p.acf.repo ? <a className="button" 
						href={p.acf.repo} 
						target="_blank" 
						rel="noreferrer">
							Repo
						</a> : ""}
				</div> : ""}
			</section>
			{p.content.rendered !== "" ? <section className="content">
				{organizeContent( p.content.rendered ).map((img, i) => <div className="figure" key={img.src}>
					<img src={img.src} alt="" />
					{img.caption ? <p>{img.caption}</p> : ""}
				</div>)}
			</section> : ""}
		</article>)} */}

		<div className="next-project">
			<img src={nextProject.acf.cover} alt={nextProject.title.rendered} />
			<div className="shader"></div>
			<h3>Next up:</h3>
			<a href={"https://signage.malikdunston.com/work/" + nextProject.slug}>
				<img src={nextProject.acf.cover} alt={nextProject.title.rendered} />
				<h1>
					{nextProject.title.rendered}
				</h1>
			</a>
		</div>

	</div> : ""
} 
export default CaseStudy;