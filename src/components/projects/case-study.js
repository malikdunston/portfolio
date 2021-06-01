import React, { Component, useParams } from "react";
class Casestudy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			slug: this.props.match.params.projectName,
		}
	}
	componentDidMount() {
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
		return (
			<div>
				{this.state.data ? (
					<div>
						{this.state.data.map(p => {
							return (
								<article key={p.id} id={p.slug}>
									<section className="text">
										<h3>
											{p.body.text.title}
										</h3>
										<p>
											{p.body.text.desc}
										</p>
									</section>
									<section className="content">
										{p.body.images.map(img=>{
											return <img src={img.currentSrc} alt="" />
										})}
									</section>

								</article>
							)
						})}
					</div>
				) : (
					<div>loading proj.....</div>
				)}
			</div>
		)
	}
} export default Casestudy;