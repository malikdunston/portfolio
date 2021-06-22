import React, { Component, useParams } from "react";
class Casestudy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			slug: this.props.match.params.projectName,
		}
	}
	componentDidMount() {
		document.querySelector("nav").classList.add("loading");
		this.props.getData(
			"projects", 
			`&slug=${this.state.slug}`, 
			(data)=>{
				this.setState(
					{ project: this.props.constructProject(data[0]) }, 
					()=>{
						this.props.getData("projects", `&parent=${this.state.project.id}`, (data)=>{
							this.setState({ data: data.map(p=>this.props.constructProject(p))}, ()=>console.log(this.state))
						})
					}
				)
			}
		)
	}
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