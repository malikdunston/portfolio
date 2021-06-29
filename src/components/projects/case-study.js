import React, { Component, useParams } from "react";
class Casestudy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null
		}
	}
	componentDidMount() {
		document.querySelector("nav").classList.add("loading");
	}
	// getContentFromChildren(proj) {
	// 	if (proj.parent > 0) {
	// 		return {
	// 			text: {
	// 				title: proj.title.rendered,
	// 				desc: proj.acf.about
	// 			},
	// 			images: findImages(proj)
	// 		}
	// 	}
	// }
	// findImages(proj) {
	// 	let html = document.createElement("div");
	// 	html.innerHTML = proj.content.rendered;
	// 	return [...html.querySelectorAll("figure")].map(fig => {
	// 		let img = {
	// 			src: fig.querySelector("img").src,
	// 		}
	// 		fig.querySelector("figcaption") ? img.caption = fig.querySelector("figcaption").textContent : img.caption = null
	// 		return img
	// 	})
	// }
	render() {
		if(this.state.data){ 
			document.querySelector("nav").classList.remove("loading");
			return <div>
				{this.state.data.map(p => {
					return (
						<article key={p.id} id={p.slug}>
							<section className="text">
								<div className="column">
									<h3 dangerouslySetInnerHTML={{__html: p.body.text.title}}></h3>
									<p>{p.body.text.desc}</p>
									{p.url
										? <a className="button" href={p.url} target="_blank" rel="noreferrer">
											Link
										</a> : ""}
									{p.repo
										? <a className="button" href={p.repo} target="_blank" rel="noreferrer">
											Repo
										</a> : ""}
								</div>
							</section>
							<section className="content">
								{p.body.images.map(img=>{
									return <div className="figure">
										<img src={img.src} alt="" />
										{img.caption ? <p>{img.caption}</p> : ""}
									</div>
								})}
							</section>
						</article>
					)
				})}
			</div>
		}else{
			return ""
		}
	}
} export default Casestudy;