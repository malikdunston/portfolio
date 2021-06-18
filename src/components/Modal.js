import React, { Component } from "react";
class Modal extends Component { 
constructor(props){
	super(props);
}
render(){ return (
	<div id="modal"
		className={this.props.data.isOpen ? "open" : ""}>
		<section id="modalContent">
			{this.props.data.content}
				<button onClick={(ev)=>{
					this.props.toggle(false, "");
					if(typeof this.props.data.callback === "function"){
						this.props.data.callback()
					}
				}}>
					{this.props.data.action}
				</button>
		</section>
	</div>
) }
} export default  Modal;