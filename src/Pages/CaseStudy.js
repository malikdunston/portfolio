import React, { useState, useEffect } from 'react';
import { organizeContent } from "./../Services/wordpress";
function CaseStudy({ projects, thisProject, match, selectProject}) {
	const [ media, setMedia ] = useState([]);
	useEffect(() => { 
		selectProject({
			slug: match.params.projSlug
		})
	}, [ projects ]);
	return thisProject ? <div className={"case-study " + thisProject.slug}>
		<header>
			<img src={thisProject.acf.cover} alt={thisProject.title.rendered} />
			<div className="shader"></div>
			<h1 dangerouslySetInnerHTML={{ __html: thisProject.title.rendered }}></h1>
		</header>
		{thisProject.projChildren.map((p, i) => <article className={p.slug}>
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
		</article>)}

		

	</div> : ""
} 
export default CaseStudy;