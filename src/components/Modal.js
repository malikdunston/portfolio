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
			{/* <button onClick={(ev)=>{this.props.toggle(false)}}>close</button> */}
		</section>
	</div>
) }
} export default  Modal;