import React, { Component, useParams } from "react";
	import { withRouter } from "react-router-dom";
class Casestudy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
		}
	}
	componentWillMount(){
		let slug = this.props.match.params.projectName
		let isHidden = this.props.hiddenProjects.filter(h=>h[0] === slug)[0];
		if(isHidden){
			let pw = prompt("Password: ");
			if(!isHidden[1].includes(pw)){
				alert("Password Incorrect!");
				window.location.href = "https://www.malikdunston.com/";
			}
		}
	}
	componentDidMount() {
		document.querySelector("nav").classList.add("loading");
	}
	render() {
		if (this.props.data) {
			document.querySelector("nav").classList.remove("loading");
			return <div>
				{this.props.data.projects.map(p => {
					return <article key={p.id} id={p.slug}>
						<section className={"text " + (p.images.length > 0 ? "" : "flex")}>
							<div className="column">
								<h3 dangerouslySetInnerHTML={{ __html: p.text.title }}></h3>
								{p.text.desc ? <p>{p.text.desc}</p> : ""}
								{p.tools.length > 0 ? <div className="skills">
									{Object.keys(p.tools).map(tool => {
										return (<div className={tool} key={tool}>
											{p.tools[tool].map(s => <span key={s}>{s}</span>)}
										</div>)
									})}
								</div> : ""}
								{p.url ? <a className="button" 
									href={p.url} 
									target="_blank" 
									rel="noreferrer">
										Link
									</a> : ""}
								{p.repo ? <a className="button" 
									href={p.repo} 
									target="_blank" 
									rel="noreferrer">
										Repo
									</a> : ""}
							</div>
							<div dangerouslySetInnerHTML={{ __html: p.html }}></div>
						</section>
						{p.images.length > 0 ? <section className="content">
							{p.images.map(img => {
								return <div className="figure"
									key={img.src}>
									<img src={img.src} alt="" />
									{img.caption ? <p>{img.caption}</p> : ""}
								</div>
							})}
						</section> : ""}
					</article>
				})}
			</div>
		} else {
			return ""
		}
	}
} export default withRouter(Casestudy);