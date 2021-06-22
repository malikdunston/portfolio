import React, { Component } from "react";
class Modal extends Component { 
constructor(props){
	super(props);
}
render(){ return (
	<div id="modal" className={this.props.data.isOpen ? "open" : ""} onClick={(ev)=>{
		if(!this.props.data.persist && (ev.target.id === "modal")){
			this.props.toggle(false, "");
		}
	}}>
		<section id="modalContent">
			{!this.props.data.persist ? <div className="close" onClick={(ev)=>{this.props.toggle(false, "")}}>
				╳
			</div> : ""}
			{this.props.data.content}
			{this.props.data.action
				? <button onClick={(ev)=>{
					this.props.toggle(false, "");
					if(typeof this.props.data.callback === "function"){
						this.props.data.callback()
					}
				}}>
					{this.props.data.action}
				</button>
				: ""
			}
		</section>
	</div>
) }
} export default  Modal;