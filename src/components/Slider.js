import React, { Component } from "react";
class Slider extends Component { 
render(){ return (
	<div>Sldier....</div>
	// <div id="modal" className={this.props.data.isOpen ? "open" : ""} onClick={(ev)=>{ if(!this.props.data.persist && (ev.target.id === "modal")){
	// 	this.props.toggle(false, "");
	// }}}>
	// 	<section id="modalContent">
	// 		{!this.props.data.persist ? <div className="close" onClick={(ev)=>{this.props.toggle(false, "")}}>
	// 			╳
	// 		</div> : ""}
	// 		{this.props.data.content}
	// 		{this.props.data.action
	// 			? <button onClick={(ev)=>{
	// 				this.props.toggle(false, "");
	// 				if(typeof this.props.data.callback === "function"){
	// 					this.props.data.callback()
	// 				}
	// 			}}>
	// 				{this.props.data.action}
	// 			</button>
	// 			: ""
	// 		}
	// 	</section>
	// </div>
) }
} export default  Slider;












// window.sliderJS = window.sliderJS || {};
// sliderJS = {
// 	...sliderJS,
// 	module: {} // only 1 for now...
// }
// console.log("SLIDER J S");
// window.addEventListener("load", function(event){
// 	sliderJS.module = Module(event);
// 	sliderJS.module.render();
// 	console.dir(sliderJS)
// });
// const Module = event => {
// 	this.scope = event.currentTarget, this.html = event.target;
// 	this.interval = 1000, this.counter = 0;
// 	this.render = () => {
// 		const childNodes = "sljs";
// 		const count = () => this.counter++;
// 		const sliders = Array.from(this.html.querySelectorAll(`*[${childNodes}]`)).map(elem => {
// 			let slider = new Slider(elem, this.scope);
// 			// console.log(slider);
// 			slider.render();
// 			return slider;
// 		});
// 	// works, but unused yet.
// 	// intended to be "global" counter, from which Slider counters are updated...
// 		this.rotation ? clearInterval(this.rotation) : this.rotation = setInterval(count.bind(this), this.interval);
// 	};
// 	let x = {
// 		scope: this.scope,
// 		interval: this.interval,
// 		render: this.render,
// 		sliders: this.scope.sliders
// 	}
// 	console.dir("module: ", x, this)
// 	return x
// }
// function Slider(elem, Module) {
// 	const setDefault = (elem, name, def) => {
// 		return elem.attributes.hasOwnProperty(name) ? elem.attributes[name].value : def
// 	};
// 	const makeDataList = (arr) => {
// 		if (!arr) arr = [{
// 			img: "",
// 			content: {
// 				title: "Your Slider Has No Data!",
// 				content: "Attach some data to your slider element to begin."
// 			}
// 		}];
// 		return [arr[arr.length - 1], ...arr, arr[0]];
// 	};
// 	const makeSlides = (obj) => {
// 		let slide = Object.assign(
// 			document.createElement("div"),
// 			{
// 				style: `${this.axis == "Y" ? "min-height": "min-width"}: 100%; position: relative;`
// 			}
// 		)
// 		slide.appendChild(Object.assign(
// 			document.createElement("img"),
// 			{
// 				src: obj.img,
// 				style: "object-fit: cover; width: 100%; height: 100%; position: absolute"
// 			}
// 		));
// 		slide.appendChild(Object.assign(
// 			document.createElement("div"),
// 			{
// 				classList: ["slider-content"],
// 				style: "width: 100%; position: absolute; bottom: 0",
// 				innerHTML: [obj.content.title, obj.content.content].join("</br>")
// 			}
// 		));
// 		return slide;
// 	};
// 	this.setTransformation = () => {
// 		return `translate${this.axis}(${-(this.axis == "Y" ? this.html.clientHeight : this.html.clientWidth) * this.index}px)`
// 	}
// 	this.loop = function(){
// 		if (this.index == this.data.length - 1) {
// 			this.feed.style.transition = "none";
// 			this.index = 1;
// 			this.feed.style.transform = `translate${this.axis}(${-(this.axis == "Y" ? this.html.clientHeight : this.html.clientWidth) * this.index}px)`;
// 		};
// 		if (this.index == 0) {
// 			this.feed.style.transition = "none";
// 			this.index = this.data.length - 2;
// 			this.feed.style.transform = `translate${this.axis}(${-(this.axis == "Y" ? this.html.clientHeight : this.html.clientWidth) * this.index}px)`;
// 		};
// 	}
// 	this.increment = (forBack) => {
// 		forBack ? forBack = forBack : forBack = this.direction;
// 		if(typeof forBack == "number"){
// 			this.index = forBack
// 		}
// 		switch (forBack) {
// 			case "forward":
// 				if (this.index >= this.data.length - 1) return;
// 				this.index++;
// 				break;
// 			case "backward":
// 				if (this.index <= 0) return;
// 				this.index--;
// 				break;
// 		}
// 		this.resetSlider();
// 	}
// 	this.animation = function(startStop,){
// 		if (startStop == "start"){
// 			this.rotation = setInterval(this.increment, this.interval)
// 		}else if (startStop == "stop"){
// 			clearInterval(this.rotation)
// 		}
// 	}
// 	this.resetSlider = function() {
// 		this.animation("stop");
// 		this.html.setAttribute("slider-index", this.index);
// 		this.html.querySelector(".slider-feed").style.transition = `${this.transition}`;
// 		this.html.querySelector(".slider-feed").style.transform = `translate${this.axis}(${-(this.axis == "Y" ? this.html.clientHeight : this.html.clientWidth) * this.index}px)`;
// 		// if(this.index > this.data.length - 2){
// 		// 	this.index = 1
// 		// }
// 		// console.log(this.index, this.data.length - 2);
// 		// this.html.querySelector(`.slider-index div`).style.background = `purple`;
// 		// this.html.querySelector(`.slider-index div:nth-of-type(${this.index})`).style.background = `red`;
// 		this.animation("start");
// 	}
// 	this.html = Object.assign(elem, {
// 		style: `
// 			height: 325px;
// 			position: relative;
// 			overflow: hidden;
// 		` // height: ...
// 	});
// 	this.id = elem.attributes["sljs"].value;
// 	this.scope = Module.scope[this.id];
// 	this.data =  makeDataList(this.scope); // replace this w/this.slider.feed...
// 	this.axis = setDefault(elem, "axis", "X");
// 	this.interval = setDefault(elem, "interval", "4000");
// 	this.direction = setDefault(elem, "direction", "forward");
// 	this.transition = setDefault(elem, "transition", "100ms");
// 	this.delay = setDefault(elem, "delay", "1");
// 	this.index = parseInt(setDefault(elem, "offset", "0")) + 1;
// 	this.controls = setDefault(elem, "controls", "0");
// 	this.feed = Object.assign(document.createElement("div"), {
// 		classList: ["slider-feed"],
// 		style: `
// 			display: flex; 
// 			height: 100%; 
// 			flex-direction: ${this.axis == "Y" ? "column" : "row"};
// 			transform: ${this.setTransformation()};
// 		`,
// 		innerHTML: this.data.map(d => makeSlides(d).outerHTML).join(""),
// 		ontransitionend: (e)=>{this.loop(e)}
// 	});
// 	this.render = () => {
// 		if ( this.controls == 1 ||
// 			this.controls == "true" ||
// 			this.controls == true ) {
// 			this.html.append( Controls(this) );
// 		}
// 		this.html.append( this.feed );
// 		let slider = this;
// 		setTimeout(function(){
// 			slider.resetSlider();
// 		}, this.delay)
// 		window.addEventListener("resize", function () {
// 			slider.resetSlider();
// 		})
// 	}
// 	console.log("slider", this);
// 	return this
// }
// const Controls = slider => {
// 	this.viewBox = "0 0 100 100";
// 	this.btnStyles = `
// 		width: 2rem;
// 		height: 2rem;
// 	`;
// 	this.backward = Object.assign(document.createElement("svg"), {
// 		style: this.btnStyles,
// 		classList: ["backward"],
// 		innerHTML: `<polyline points="100 0 50 50 100 100" />`,
// 	});
// 	this.forward = Object.assign(document.createElement("svg"), {
// 		style: this.btnStyles,
// 		classList: ["forward"],
// 		innerHTML: `<polyline points="0 100 50 50 0 0" style="pointer-events: none"/>`,
// 	});
// 	this.backward.setAttribute("viewbox", this.viewBox)
// 	this.forward.setAttribute("viewbox", this.viewBox)
// 	this.html = Object.assign(document.createElement("div"), {
// 		classList: ["slider-controls"],
// 		style: `
// 			fill: none;
// 			stroke: white;
// 			stroke-miterlimit: 10;
// 			stroke-width: 10px;
// 			position: absolute;
// 			z-index: 500;
// 			width: 100%;				
// 			height: 100%;		
// 			display: flex;
// 			align-items: center;
// 			justify-content: space-between;	
// 		`,
// 		innerHTML: [this.backward.outerHTML, this.forward.outerHTML].join(""),
// 		onclick: e => {
// 			let x;
// 			if(e.target.nodeName == "svg") {slider.increment(e.target.classList[0]);}
// 		}
// 	});
// 	return this.html;
// }
// const Counter = slider => {
// 	this.btns = [];
// 	for(let x = 1; x < slider.data.length - 1; x++){
// 		let btn = Object.assign(document.createElement("div"), {
// 			classList: [`counter-btn-${x}`],
// 			style: `
// 				height: 20px;
// 				width: 40px;
// 				margin-right: 10px;
// 				background: purple;
// 			`,
// 			innerHTML: x,
// 			onclick: e => {
// 				slider.increment(x)
// 			}
// 		});

// 		btn.addEventListener("click", () => {
// 			console.log("alkdsjfa ");
// 		})

// 	}
// 	this.html = Object.assign(document.createElement("div"), {
// 		classList: ["slider-index"],
// 		style: `
// 			position: absolute;
// 			z-index: 550;
// 			bottom: 1rem;
// 			left: 1rem;
// 			background: red;
// 			display: flex;
// 			padding: 10px;
// 			padding-right: 0;
// 		`,
// 		innerHTML: this.btns.map(b => b.outerHTML).join(""),
// 		onclick: e => {
// 			if(e.target.classList[0] == "counter-btn"){
// 				console.log("asdfas");
// 			}
// 			// slider.increment(slider.)
// 		}
// 	});
// 	return this.html;
// }