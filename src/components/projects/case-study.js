import React, { Component } from "react";
import { withRouter } from "react-router-dom";
class Casestudy extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	UNSAFE_componentWillMount(){
		let slug = this.props.match.params.projectName
		let isHidden = this.props.hiddenProjects.filter(h=>h[0] === slug)[0];
		let isPassword = isHidden[1][0];
		console.log(isPassword);
		if(isHidden && isPassword !== "public"){
			let pw = prompt("Password: ");
			if(!isHidden[1].includes(pw)){
				alert("Password Incorrect!");
				window.location.href = "https://www.malikdunston.com/";
			}
		}
	}
	componentDidMount(props) {
		document.querySelector("nav").classList.add("loading");
	}
	render() {
		if (this.props.data) {
			document.querySelector("nav").classList.remove("loading");
			const renderSkillsTools = ()=>{
				const skillsTools = this.props.data.tools;
				return <div className="skills">
					{Object.keys(skillsTools).map(tool=>{
						return ( <div className={tool} key={tool}>
							{skillsTools[tool].map(s=><span key={s}>{s}</span>)}
						</div>)
					})}
				</div>

			}
			return <div id="casestudy">
				{this.props.data.projects.map((p, i) => {
					return <article key={p.id} id={p.slug}>
						<section className={"text " + (p.images.length > 0 ? "" : "flex")}>
							<div className="column">
								<h3 dangerouslySetInnerHTML={{ __html: p.text.title }}></h3>
								{p.text.desc ? <p>{p.text.desc}</p> : ""}
								{(i === 0) ? renderSkillsTools() : ""}
							</div>
							<div dangerouslySetInnerHTML={{ __html: p.html }}></div>
							<div className="btn-group column">
								{p.url ? <a className="button" 
									href={p.url} 
									target="_blank" 
									rel="noreferrer">
										Live
									</a> : ""}
								{p.repo ? <a className="button" 
									href={p.repo} 
									target="_blank" 
									rel="noreferrer">
										Repo
									</a> : ""}
							</div>
						</section>
						{p.images.length > 0 ? <section className="content">
							<div slider-js={[{img: "3.jpg"}, {img: "3.jpg"}]}>

							</div>
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