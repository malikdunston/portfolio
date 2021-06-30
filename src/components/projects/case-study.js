import React, { Component, useParams } from "react";
class Casestudy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
		}
	}
	componentDidMount(){
		this.setState({
			loaded: true
		})
	}
	render() {
		if(this.props.data && this.state.loaded){
			return <div>
				{this.props.data.projects.map(p=>{
					return <article key={p.id} id={p.slug}>
						<section className="text">
							<div className="column">
								<h3 dangerouslySetInnerHTML={{__html: p.text.title}}></h3>
								<p>{p.text.desc}</p>
								<div className="skills">
									{Object.keys(p.tools).map(tool=>{
										return ( <div className={tool} key={tool}>
											{p.tools[tool].map(s=><span key={s}>{s}</span>)}
										</div>)
									})}
								</div>
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
							{p.images.map(img=>{
								return <div className="figure">
									<img src={img.src} alt="" />
									{img.caption ? <p>{img.caption}</p> : ""}
								</div>
							})}
						</section>
					</article>
				})}
			</div>
		}else{
			return ""
		}



		return <div>





			{/* {this.state.data.map(p => {
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
			})} */}
		</div>
	}
} export default Casestudy;